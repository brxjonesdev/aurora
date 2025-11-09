import { StoryEvent } from './events';

export type StoryTimeline = {
  id: string;
  ownerId: string;
  events: StoryEvent[];
  timeUnit: 'chapter' | 'scene' | 'act' | 'custom';
  customTimeUnit?: string;
  orderedBy: 'order' | 'custom';
  createdAt: string;
  updatedAt: string;
};
