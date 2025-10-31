"use client";
import { Button } from '@/lib/shared/components/ui/button';
import { CardAction } from '@/lib/shared/components/ui/card';
import { PlusCircleIcon } from 'lucide-react';
import React from 'react'
import { StoryEvent } from '../../types/events';
import { usePlotweaverStore } from '../../stores/plotweaver-store-provider';
    
interface CreateEventButtonProps {
    user: string;
    slug: string;
}
export default function CreateEventButton(props: CreateEventButtonProps) {
    const {addEvent} = usePlotweaverStore((state) => state);
    const createNewEvent = () => {
        const newEvent: StoryEvent = {
            id: crypto.randomUUID(),
            storyId: props.slug,
            title: 'New Event',
            type: 'character_introduction',
            timestamp: new Date().toISOString(),
            order: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            description: '',
            chapterId: crypto.randomUUID(),
            summary: 'This is a new event.',
        }
        addEvent(newEvent);
        console.log('Creating new event:', newEvent);
        // update global state and call API to save the new event
    }
  return (
    <CardAction>
        <Button className='bg-blue-300 hover:bg-blue-400 hover:cursor-pointer' onClick={createNewEvent}>
            <PlusCircleIcon/> Event
        </Button>
    </CardAction>
  )
}
