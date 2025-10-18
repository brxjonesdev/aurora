// ========== THREAD TYPES ==========

export type ThreadType =
    | 'main'
    | 'subplot'
    | 'character-arc'
    | 'worldbuilding'
    | 'romance'
    | 'mystery'

export interface PlotThread {
    id: string;
    storyId: string;
    title: string;
    color: string;
    description: string;
    type: ThreadType;
    order: number;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PlotThreadCreate {
    storyId: string;
    title: string;
    description?: string;
    color?: string;
    type: ThreadType;
}

export interface PlotThreadUpdate {
    title?: string;
    description?: string;
    color?: string;
    type?: ThreadType;
    order?: number;
    isVisible?: boolean;
}

// ========== EVENT TYPES ==========

export type StoryBeatType =
    | 'setup'
    | 'rising-action'
    | 'climax'
    | 'falling-action'
    | 'resolution'
    | 'plot-twist'
    | 'flashback'
    | 'foreshadowing'
    | 'character-development'
    | 'reveal'

export interface PlotEvent {
    id: string;
    storyId: string;
    title: string;
    description: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string;
    position: number; // Order within same time unit
    threadIds: string[];
    type: StoryBeatType;
    tensionLevel?: number; // 1-10 for analytics
    createdAt: string;
    updatedAt: string;
}

export interface PlotEventCreate {
    storyId: string;
    title: string;
    description: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string;
    threadIds: string[];
    type: StoryBeatType;
    tensionLevel?: number;
}

export interface PlotEventUpdate {
    title?: string;
    description?: string;
    chapter?: number;
    scene?: number;
    act?: number;
    customTime?: string;
    position?: number;
    threadIds?: string[];
    type?: StoryBeatType;
    tensionLevel?: number;
}

// ========== STORY TYPES ==========

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
    settings: StorySettings;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
}

export const DEFAULT_STORY_SETTINGS: StorySettings = {
    timeUnit: 'chapter',
    defaultView: 'timeline',
}

export interface StoryCreate {
    title: string;
    description: string;
    slug: string;
    ownerId: string;
    settings?: Partial<StorySettings>;
}

export interface StoryUpdate {
    title?: string;
    description?: string;
    slug?: string;
    settings?: Partial<StorySettings>;
}

// ========== CONNECTION TYPES ==========

export type ConnectionType =
    | 'cause-effect'
    | 'setup-payoff'
    | 'conflict-resolution'
    | 'echoes'
    | 'symbolism'
    | 'prerequisite'

export interface EventThreadConnection {
    id: string;
    storyId: string;
    fromEventId: string;
    toThreadId: string;
    type: ConnectionType;
    createdAt: string;
    updatedAt: string;
}

export interface EventEventConnection {
    id: string;
    storyId: string;
    fromEventId: string;
    toEventId: string;
    type: ConnectionType;
    createdAt: string;
    updatedAt: string;
}