/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect } from 'react';
import StoryCard from './story-card';
import { Story } from '@/lib/aurora/core/types/story';
import { useApricityStore } from '@/lib/aurora/core/stores/apricity-store';
import { set } from 'date-fns';

export default function Stories({
  initialStories,
  username,
}: {
  initialStories: Story[];
  username: string;
}) {

  const stories = useApricityStore((state) => state.stories)
  const setStories = useApricityStore((state) => state.setStories)

  useEffect(() => {
    setStories(initialStories);
  }, [initialStories]);

  // Sort stories by updatedAt descending
  const displayStories = [...stories].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );


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
