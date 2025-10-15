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
    <Card className="max-h-72 w-full md:max-w-72" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
        <CardDescription>{story.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
