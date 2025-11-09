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
  storyId: string;
  manuscripts: {
    id: string;
    root_folder_id: string | null;
  }[];
}

export const DEFAULT_STORY_SETTINGS: StorySettings = {
  timeUnit: 'chapter',
  defaultView: 'timeline',
};

export interface StoryCreateInput {
  title: string;
  description: string;
  ownerId: string;
}

export interface StoryCreate extends StoryCreateInput {
  slug?: string;
  storyId: string;
}

export interface StoryUpdate {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
  settings?: Partial<StorySettings>;
}
