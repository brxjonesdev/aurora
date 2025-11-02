'use client';
import { Story } from '@/lib/aurora/core/types/story';
import { Card, CardDescription, CardHeader, CardTitle } from '@/lib/shared/components/ui/card';
import { useRouter } from 'next/navigation';

export default function StoryCard({ story, username }: { story: Story; username: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/aurora/manuscript/${username}/${story.slug}?view=cards`);
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
