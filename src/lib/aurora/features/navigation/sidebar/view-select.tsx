"use client"
import { Button } from '@/lib/shared/components/ui/button'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/lib/shared/components/ui/sidebar'
import { ChartBarStackedIcon, ChartGanttIcon, ChartNoAxesCombinedIcon, SquareKanbanIcon } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

export const VIS_MODES = [
  { name: "Timeline", slug: "timeline", icon: <ChartGanttIcon /> },
  { name: "Swimlane", slug: "swimlane", icon: <ChartBarStackedIcon /> },
  { name: "Board", slug: "board", icon: <SquareKanbanIcon /> },
  { name: "Analytics", slug: "analytics", icon: <ChartNoAxesCombinedIcon/>},
  ]

export default function ViewSelect() {
  const router = useRouter()

  const handleClick = (modeSlug: string) => {
    router.push(`${modeSlug}`)

  }
  return (
  <SidebarGroup>
    <SidebarGroupLabel className='pb-2'>
    Visualization Modes
    </SidebarGroupLabel>
    <SidebarGroupContent className="gap-2 grid-cols-2 grid">
    {VIS_MODES.map((mode) => (
      <Button 
      onClick={() => handleClick(mode.slug)}
      key={mode.slug} 
      size="lg" 
      className="w-full  text-md cursor-pointer">
      {mode.icon}
      {mode.name}
      </Button>
    ))}
    </SidebarGroupContent>
  </SidebarGroup>
  )
}
