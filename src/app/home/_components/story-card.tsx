'use client';
import { Story } from '@/lib/apricity/core/types/story';
import { Card, CardDescription, CardHeader, CardTitle } from '@/lib/shared/components/ui/card';
import { useRouter } from 'next/navigation';

export default function StoryCard({ story}: { story: Story }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${story.manuscripts[0].id}`);
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
