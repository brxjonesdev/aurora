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
    id: string;
    title?: string;
    description?: string;
    slug?: string;
    settings?: Partial<StorySettings>;
}