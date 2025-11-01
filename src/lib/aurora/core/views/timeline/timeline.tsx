import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import React from 'react';
import { StoryEvent } from '../../types/events';
import EventCard from './timeline-card';
import { Button } from '@/lib/shared/components/ui/button';
import CreateEventButton from './create-event-button';
import TimelineEvents from './timeline-events';

interface TimelineProps {
  user: string;
  slug: string;
  // Define your props here, or leave empty if there are none
}

export default function Timeline(props: TimelineProps) {
  const formattedSlug = props.slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  // const events = await timelineService.getStoryEvents(props.user, props.slug);
  const events: StoryEvent[] = []; // Placeholder for fetched events
  return (
    <section className="flex flex-1 flex-col gap-4 p-4">
      <Card className="flex-1 pb-0">
        <CardHeader>
          <CardTitle>Timeline View</CardTitle>
          <CardDescription>
            View your story&apos;s events in a chronological timeline format.
          </CardDescription>
          <CreateEventButton user={props.user} slug={props.slug} />
        </CardHeader>
        <TimelineEvents initialEvents={events} />
      </Card>
    </section>
  );
}
