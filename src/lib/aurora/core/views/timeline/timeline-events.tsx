/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect } from 'react'
import { StoryEvent } from '../../types/events'
import { CardContent } from '@/lib/shared/components/ui/card'
import EventCard from './timeline-card'
import { usePlotweaverStore } from '../../stores/plotweaver-store-provider'

export default function TimelineEvents({ initialEvents }: { initialEvents: StoryEvent[] }) {
  const { events, setEvents } = usePlotweaverStore((state) => state)

  useEffect(() => {
    setEvents(initialEvents)
  }, [initialEvents])

  return (
    <CardContent className="flex-1 flex flex-col p-0">
      {events.length === 0 ? (
        <div className="flex-1 bg-blue-300/30 rounded-b-lg flex items-center justify-center p-8 flex-col">
          <p className="text-blue-400">No events found for this story.</p>
          <p>Add one</p>
        </div>
      ) : (
        events.map((event: StoryEvent) => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </CardContent>
  )
}
