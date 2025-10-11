import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import React from 'react';
import CreateStory from '@/lib/aurora/core/stories/create-story';
import { Story } from '@/lib/aurora/core/stories/types';
import StoryCard from '@/lib/aurora/core/stories/story-card';

export default async function Homepage() {
  const stories: Story[] = [
    {
      id: '1',
      title: 'My First Story',
      slug: 'my-first-story',
      description: 'This is the description of my first story.',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 'user1',
    },
    {
      id: '2',
      title: 'My Second Story',
      slug: 'my-second-story',
      description: 'This is the description of my second story.',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 'user1',
    },
  ]; // fetch stories from backend

  const userStories = stories; // filter stories by current user
  return (
    <section className="flex w-full flex-1 gap-0 px-8 py-4">
      <Card className="flex-1 gap-0 border-2 bg-transparent p-0">
        <CardHeader className="gap-0 p-4">
          <CardTitle className="text-md font-medium">Your Stories</CardTitle>
          <CardDescription className="text-sm">Create and manage your stories.</CardDescription>
          <CardAction>
            <CreateStory />
          </CardAction>
        </CardHeader>
        <CardContent className="bg-secondary flex flex-1 flex-col gap-4 rounded-b-lg p-4 lg:flex-row">
          {userStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
          {userStories.length === 0 && (
            <section className="flex flex-1 flex-col items-center justify-center">
              <h2>You have no stories yet.</h2>
              <p className="text-muted-foreground">
                Click &quot;Create New Story&quot; to get started!
              </p>
            </section>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
