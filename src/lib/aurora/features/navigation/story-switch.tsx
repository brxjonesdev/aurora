'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/shared/components/ui/select';
import { usePathname } from 'next/navigation';

export interface StoryMenuItem {
  id: number;
  name: string;
  slug: string;
}

export default function StorySwitch({ stories }: { stories: StoryMenuItem[] }) {
  const pathname = usePathname();

  if (pathname === '/aurora/home') {
    return <p>Home</p>;
  }
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={stories[0]?.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
