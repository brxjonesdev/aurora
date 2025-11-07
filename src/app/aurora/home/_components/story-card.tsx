'use client';
import { Story } from '@/lib/aurora/core/types/story';
import { Card, CardDescription, CardHeader, CardTitle } from '@/lib/shared/components/ui/card';
import { useRouter } from 'next/navigation';

export default function StoryCard({ story, username }: { story: Story; username: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (story.manuscripts && story.manuscripts.length > 0 && story.manuscripts[0].root_folder_id) {
      router.push(`/aurora/${username}/${story.manuscripts[0].id}/${story.manuscripts[0].root_folder_id}?view=editor`);
    } else {
      router.push(`/aurora/${username}/${story.manuscripts[0].id}`);
    }
  };

  return (
    <Card className="h-full w-full" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
        <CardDescription>{story.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
