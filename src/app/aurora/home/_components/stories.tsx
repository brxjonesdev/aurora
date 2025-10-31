"use client";

import React, { useEffect } from 'react';
import StoryCard from './story-card';
import { useAppStore } from '@/lib/aurora/core/stores/AppStoreProvider';
import { Story } from '@/lib/aurora/core/types/story';

export default function Stories({ 
  initialStories, 
  username 
}: { 
  initialStories: Story[], 
  username: string 
}) {
  // Get stories from store
  const stories = useAppStore((state) => state.stories);
  const setStories = useAppStore((state) => state.setStories);
  
  // Sync initial data with store on mount
  useEffect(() => {
    if (initialStories.length > 0) {
      setStories(initialStories);
    }
  }, [initialStories, setStories]);
  
  // Use store data for rendering (falls back to initialStories during hydration)
  const displayStories = stories.length > 0 ? stories : initialStories;
  
  return (
    <div className="grid flex-1 auto-rows-[150px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {displayStories.map((story: Story) => (
        <StoryCard key={story.id} story={story} username={username} />
      ))}
    </div>
  );
}