// types for plot threads, events, and connections
export type ThreadType = 
    | 'main'
    | "subplot"
    | "character arc"
    | "worldbuilding"
    | "romance"
    | "mystery"

export interface PlotThread {
    id: string;
    storyId: string;
    title: string;
    color: string; // Hex color code for thread visualization
    description: string;
    type: ThreadType;
    createdAt: Date;
    updatedAt: Date;
}

export interface PlotThreadCreate {
    storyId: string;
    title: string;
    description: string;
    color: string; // Hex color code for thread visualization
    type: ThreadType;
}

export interface PlotThreadUpdate {
    title?: string;
    description?: string;
    color?: string; // Hex color code for thread visualization
    type?: ThreadType;
}

// types for plot events / story beats
export type StoryBeatType =
    | 'setup'
    | 'rising action'
    | 'climax'
    | 'falling action'
    | 'resolution'
    | 'plot twist'
    | 'flashback'
    | 'foreshadowing'
    | 'character development'
    | 'reveal'

export interface PlotEvent {
    id: string;
    storyId: string;
    title: string;
    description: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string; // For custom time units
    threadIds: string[]; // IDs of associated plot threads
    type: StoryBeatType;
    createdAt: Date;
    updatedAt: Date;
}

export interface PlotEventCreate {
    storyId: string;
    title: string;
    description: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string; // For custom time units
    threadIds: string[]; // IDs of associated plot threads
    type: StoryBeatType;
}
export interface PlotEventUpdate {
    title?: string;
    description?: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string; // For custom time units
    threadIds?: string[]; // IDs of associated plot threads
    type?: StoryBeatType;
}

// types for story and story settings

export interface StorySettings {
    timeUnit: 'chapter' | 'scene' | 'act' | 'custom';
    customTimeUnit?: string;
    defaultView: 'timeline' | 'plot' | 'threads';

    
}
 
export interface Story {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

export interface StoryCreate {
  title: string;
  description: string;
  ownerId: string;
  slug: string;
}

export interface StoryUpdate {
    title?: string;
    description?: string;
    slug?: string;
}


// types for connections between plot events and plot threads
export type ConnectionType =
    | 'cause-effect'
    | 'setup-payoff'
    | "conflict-resolution"
    | "echoes"
    | "symbolism"
    | "prerequisite"



