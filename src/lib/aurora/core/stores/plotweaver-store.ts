import { createStore } from 'zustand/vanilla';
import { StoryEvent } from '../types/events';
import { Story } from '../types/story';

export type PlotweaverState = {
  events: StoryEvent[];
  stories: Story[];
};

export type PlotweaverActions = {
  setEvents: (events: StoryEvent[]) => void;
  addEvent: (event: StoryEvent) => void;
  updateEvent: (updatedEvent: StoryEvent) => void;
  removeEvent: (eventId: string) => void;

  setStories: (stories: Story[]) => void;
  addStory: (story: Story) => void;
  updateStory: (updatedStory: Story) => void;
  removeStory: (storyId: string) => void;
};

export type PlotweaverStore = PlotweaverState & PlotweaverActions;

export const defaultInitState: PlotweaverState = {
  events: [],
  stories: [],
};

export const createPlotweaverStore = (initState: PlotweaverState = defaultInitState) => {
  return createStore<PlotweaverStore>()((set) => ({
    ...initState,
    setEvents: (events: StoryEvent[]) => set(() => ({ events })),
    addEvent: (event: StoryEvent) => set((state) => ({ events: [...state.events, event] })),
    updateEvent: (updatedEvent: StoryEvent) =>
      set((state) => ({
        events: state.events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)),
      })),
    removeEvent: (eventId: string) =>
      set((state) => ({
        events: state.events.filter((event) => event.id !== eventId),
      })),

    setStories: (stories: Story[]) => set(() => ({ stories })),
    addStory: (story: Story) => set((state) => ({ stories: [...state.stories, story] })),
    updateStory: (updatedStory: Story) =>
      set((state) => ({
        stories: state.stories.map((story) =>
          story.id === updatedStory.id ? updatedStory : story
        ),
      })),
    removeStory: (storyId: string) =>
      set((state) => ({
        stories: state.stories.filter((story) => story.id !== storyId),
      })),
  }));
};
