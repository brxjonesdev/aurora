'use client';

import React, { useEffect } from 'react';
import StoryCard from './story-card';
import { Story } from '@/lib/aurora/core/types/story';
import { usePlotweaverStore } from '@/lib/aurora/core/stores/plotweaver-store-provider';

export default function Stories({
  initialStories,
  username,
}: {
  initialStories: Story[];
  username: string;
}) {
  const stories = usePlotweaverStore((state) => state.stories);
  const setStories = usePlotweaverStore((state) => state.setStories);

  useEffect(() => {
    if (initialStories.length > 0) {
      setStories(initialStories);
    }
  }, [initialStories, setStories]);

  const displayStories = stories.length > 0 ? stories : initialStories;

  if (displayStories.length === 0) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">You have no stories yet.</h2>
        <p className="text-muted-foreground">
          Click &ldquo;Create New Story&ldquo; to get started!
        </p>
      </section>
    );
  }

  return (
    <div className="grid flex-1 auto-rows-[150px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {displayStories.map((story: Story) => (
        <StoryCard key={story.id} story={story} username={username} />
      ))}
    </div>
  );
}
