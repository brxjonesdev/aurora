"use client"

import { Empty, EmptyTitle } from '@/lib/shared/components/ui/empty'
import { SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent } from '@/lib/shared/components/ui/sidebar'
import { Plus } from 'lucide-react'
import React from 'react'

export default function ThreadSelect() {
  
  // const newThread: Thread = {
  //   id: `thread-${Date.now()}`,
  //   storyId: 'story-1',
  //   title: 'Sample Thread',
  //   description: 'This is a sample thread for testing purposes',
  //   color: '#3b82f6',
  //   type: 'main',
  //   order: 1,
  //   isVisible: true,
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString()
  // }
  //  const handleAddThread = () => {
  //   setThreads([...threads, newThread])
  //  }
  
  return (
    <SidebarGroup>
          <SidebarGroupLabel>Plot Threads</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            {/* {threads.length === 0 ? (
                <Empty>
                    <EmptyTitle>No threads yet</EmptyTitle>
                </Empty>
            ): (
                threads.map((thread) => (
                    <div 
                    key={thread.id}>
                        {thread.title}
                    </div>
                ))
            )} */}
          </SidebarGroupContent>
    </SidebarGroup>
  )
}
