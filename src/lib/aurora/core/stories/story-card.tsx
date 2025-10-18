'use client';
import{
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import { useRouter } from 'next/navigation';
import { Story } from '../types';

export default function StoryCard({ story, username }: { story: Story, username: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/aurora/${username}/${story.slug}/timeline`)
  };

  return (
    <Card className="w-full h-full" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
        <CardDescription>{story.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
