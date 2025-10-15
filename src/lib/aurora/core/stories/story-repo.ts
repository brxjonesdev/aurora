import { Result, ok, err } from "@/lib/utils";
import { Story, StoryCreate } from "./types";
import { createClient } from "@/lib/supabase/client";

export interface StoryRepository {
  create(story: StoryCreate): Promise<Result<Story, string>>;
  getStoriesByUser(userId: string): Promise<Result<Story[], string>>;
  getStoryById(storyId: string): Promise<Result<Story | null, string>>;
  update(storyId: string, title: string, content: string): Promise<Result<void, string>>;
  delete(storyId: string): Promise<Result<void, string>>;
}

export function createInMemoryRepository(): StoryRepository {
  let stories: Story[] = [];

  return {
    async create(story: StoryCreate) {
      const { ownerId, title, description, slug } = story;
      const newStory: Story = {
        id: String(stories.length + 1),
        ownerId,
        title,
        description,
        slug: slug ?? title.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      stories = [...stories, newStory];
      return ok(newStory);
    },

    async getStoriesByUser(userId) {
      const userStories = stories.filter((s) => s.ownerId === userId);
      return ok(userStories);
    },

    async getStoryById(storyId) {
      const story = stories.find((s) => s.id === storyId) ?? null;
      return ok(story);
    },

    async update(storyId, title, content) {
      const index = stories.findIndex((s) => s.id === storyId);
      if (index === -1) return err("Story not found");

      stories = stories.map((s, i) =>
        i === index ? { ...s, title, content } : s
      );
      return ok(undefined);
    },

    async delete(storyId) {
      const exists = stories.some((s) => s.id === storyId);
      if (!exists) return err("Story not found");

      stories = stories.filter((s) => s.id !== storyId);
      return ok(undefined);
    },
  };
}

export function createSupabaseRepository(): StoryRepository {
  const supabase = createClient();
  return {
  create: async function (story: StoryCreate): Promise<Result<Story, string>> {
    const { title, description, ownerId, slug } = story;
    const { data, error } = await supabase
      .from('stories')
      .insert([{ title, description, owner_id: ownerId, slug }])
      .select()
      .single();
    if (error) return err(error.message);
    return ok(data as Story);
  },
  getStoriesByUser: async function (userId: string): Promise<Result<Story[], string>> {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('owner_id', userId);
    if (error) return err(error.message);
    return ok(data as Story[]);
  },
  getStoryById: function (storyId: string): Promise<Result<Story | null, string>> {
    throw new Error("Function not implemented.");
  },
  update: function (storyId: string, title: string, content: string): Promise<Result<void, string>> {
    throw new Error("Function not implemented.");
  },
  delete: function (storyId: string): Promise<Result<void, string>> {
    throw new Error("Function not implemented.");
  }
}
}
