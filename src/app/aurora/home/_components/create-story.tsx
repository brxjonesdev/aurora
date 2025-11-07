'use client';

import { useState } from 'react';
import { Button } from '@/lib/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/shared/components/ui/dialog';
import { Input } from '@/lib/shared/components/ui/input';
import { Label } from '@/lib/shared/components/ui/label';
import { Textarea } from '@/lib/shared/components/ui/textarea';
import { Spinner } from '@/lib/shared/components/ui/spinner';
import { useServices } from '@/lib/aurora/core/useServices';
import { useRouter } from 'next/navigation';

interface CreateStoryDialogProps {
  userId: string;
  username: string;
}

export default function CreateStory({ userId, username }: CreateStoryDialogProps) {
  const { storyService } = useServices();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    const result = await storyService.createStory({
      title,
      description,
      ownerId: userId,
    });
    if (!result.ok) {
      setError(result.error);
      console.log('Error creating story:', result.error);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setError(null);
      router.push(`/aurora/${username}/${result.data.manuscripts[0].id}/timeline`);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (isSubmitting) return;
    setOpen(newOpen);
    if (!newOpen) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 cursor-pointer bg-transparent tracking-wide transition-all duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-900"
        >
          Create New Story
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Story</DialogTitle>
            <DialogDescription>
              Start your creative journey.
              <br />
              Give your story a title and description to begin.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Title <span className="text-blue-300">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter your story title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
                maxLength={100}
                autoFocus
              />
              <p className="text-muted-foreground text-xs">{title.length}/100 characters</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">
                Description <span className="text-blue-300">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what your story is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                rows={5}
                maxLength={500}
                className="resize-none"
              />
              <p className="text-muted-foreground text-xs">{description.length}/500 characters</p>
            </div>
          </div>
          <div>{error && <p className="text-sm text-blue-300">{error}</p>}</div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : (
                'Create Story'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
