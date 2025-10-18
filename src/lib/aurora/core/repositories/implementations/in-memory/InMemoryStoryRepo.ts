import { err } from "@/lib/utils";
import { ok } from "@/lib/utils";
import { DEFAULT_STORY_SETTINGS, Story, StoryCreate } from "../../../types";
import { IStoryRepository } from "../../interfaces/IStoriesRepo";

export function createInMemoryRepository(): IStoryRepository {
  let stories: Story[] = [];

  return {
    async create(story: StoryCreate) {
      const { ownerId, title, description, slug } = story;
      const newStory: Story = {
        id: String(stories.length + 1),
        ownerId,
        title,
        description,
        settings: DEFAULT_STORY_SETTINGS,
        slug: slug ?? title.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
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