'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/shared/components/ui/select';

export interface StoryMenuItem {
  id: number;
  name: string;
  slug: string;
}

interface StorySwitchProps {
  stories: StoryMenuItem[];
  selectedStory: string;
}

export default function StorySwitch({ stories, selectedStory }: StorySwitchProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/aurora/home') {
    return <p>Home</p>;
  }

  const selected = stories.find((story) => story.id.toString() === selectedStory);

  // Extract the current subpage (e.g. timeline, overview, etc.)
  const currentSubpage = pathname.split('/').pop() || 'timeline';

  const handleChange = (slug: string) => {
    const story = stories.find((s) => s.slug === slug);
    if (story) {
      router.push(`/aurora/${story.slug}/${story.id}/${currentSubpage}`);
    }
  };

  return (
    <Select defaultValue={selected?.slug} onValueChange={handleChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder={selected?.name || 'Select story'} />
      </SelectTrigger>
      <SelectContent>
        {stories.map((story) => (
          <SelectItem key={story.id} value={story.slug}>
            {story.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
