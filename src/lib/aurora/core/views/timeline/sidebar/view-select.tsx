'use client';
import { Button } from '@/lib/shared/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/lib/shared/components/ui/sidebar';
import {
  ChartBarStackedIcon,
  ChartGanttIcon,
  ChartNoAxesCombinedIcon,
  SquareKanbanIcon,
} from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export const VIS_MODES = [
  { name: 'Timeline', slug: 'timeline', icon: <ChartGanttIcon /> },
  { name: 'Swimlane', slug: 'swimlane', icon: <ChartBarStackedIcon /> },
  { name: 'Board', slug: 'board', icon: <SquareKanbanIcon /> },
  { name: 'Analytics', slug: 'analytics', icon: <ChartNoAxesCombinedIcon /> },
];

export default function ViewSelect() {
  const router = useRouter();
  const { view } = useParams<{ slug: string; user: string; view: string }>();

  const handleClick = (modeSlug: string) => {
    router.push(`${modeSlug}`);
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="pb-2">Visualization Modes</SidebarGroupLabel>
      <SidebarGroupContent className="grid grid-cols-2 gap-2">
        {VIS_MODES.map((mode) => (
          <Button
            onClick={() => handleClick(mode.slug)}
            key={mode.slug}
            size="lg"
            className={`w-full cursor-pointer gap-2 text-xs md:text-sm ${view === mode.slug ? 'bg-blue-300 text-cyan-800 hover:bg-blue-400' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            {mode.icon}
            {mode.name}
          </Button>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
