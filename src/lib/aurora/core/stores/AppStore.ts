/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand/vanilla";
import { Story, PlotThread, PlotEvent } from "../types";

// Story Slice
export type StorySlice = {
  stories: Story[];
  setStories: (stories: Story[]) => void;
  addStory: (story: Story) => void;
  removeStory: (storyId: Story["id"]) => void;
  updateStory: (storyId: Story["id"], updatedStory: Partial<Story>) => void;
};

// Thread Slice
export type ThreadSlice = {
  threads: PlotThread[];
  setThreads: (threads: PlotThread[]) => void;
  addThread: (thread: PlotThread) => void;
  removeThread: (threadId: PlotThread["id"]) => void;
  updateThread: (threadId: PlotThread["id"], updatedThread: Partial<PlotThread>) => void;
};

// Event Slice
export type EventSlice = {
  events: PlotEvent[];
  setEvents: (events: PlotEvent[]) => void;
  addEvent: (event: PlotEvent) => void;
  removeEvent: (eventId: PlotEvent["id"]) => void;
  updateEvent: (eventId: PlotEvent["id"], updatedEvent: Partial<PlotEvent>) => void;
};

// Combined Store Type
export type AppStore = StorySlice & ThreadSlice & EventSlice & {
  loading: boolean;
};

// Slice creators
const createStorySlice = (set: any): StorySlice => ({
  stories: [],
  setStories: (stories) => set({ stories }),
  addStory: (story) => set((state: AppStore) => ({ stories: [...state.stories, story] })),
  removeStory: (storyId) => set((state: AppStore) => ({
    stories: state.stories.filter((s) => s.id !== storyId),
  })),
  updateStory: (storyId, updatedStory) => set((state: AppStore) => ({
    stories: state.stories.map((s) => (s.id === storyId ? { ...s, ...updatedStory } : s)),
  })),
});

const createThreadSlice = (set: any): ThreadSlice => ({
  threads: [],
  setThreads: (threads) => set({ threads }),
  addThread: (thread) => set((state: AppStore) => ({ threads: [...state.threads, thread] })),
  removeThread: (threadId) => set((state: AppStore) => ({
    threads: state.threads.filter((t) => t.id !== threadId),
  })),
  updateThread: (threadId, updatedThread) => set((state: AppStore) => ({
    threads: state.threads.map((t) => (t.id === threadId ? { ...t, ...updatedThread } : t)),
  })),
});

const createEventSlice = (set: any): EventSlice => ({
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state: AppStore) => ({ events: [...state.events, event] })),
  removeEvent: (eventId) => set((state: AppStore) => ({
    events: state.events.filter((e) => e.id !== eventId),
  })),
  updateEvent: (eventId, updatedEvent) => set((state: AppStore) => ({
    events: state.events.map((e) => (e.id === eventId ? { ...e, ...updatedEvent } : e)),
  })),
});

// Default initial state
export const defaultInitState = {
  stories: [],
  threads: [],
  events: [],
  loading: false,
};

// Create the combined store
export const createAppStore = (initState = defaultInitState) =>
  createStore<AppStore>((set, get) => ({
    loading: initState.loading,
    ...createStorySlice(set),
    ...createThreadSlice(set),
    ...createEventSlice(set),
  }));

// Export a singleton instance if needed
export const appStore = createAppStore();