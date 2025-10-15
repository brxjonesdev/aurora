import { StoryRepository } from "./story-repo";
import { Story, StoryCreate } from "./types";
import { ok, err, Result } from "@/lib/utils";

export interface StoryService {
  getUsersStories(userId: string): Promise<Result<Story[], Error>>;
  createStory(story: StoryCreate): Promise<Result<Story, string>>;
  getStoryById(storyId: string): Promise<Result<Story | null, Error>>;
  updateStory(storyId: string, title: string, content: string): Promise<Result<void, Error>>;
  deleteStory(storyId: string): Promise<Result<void, Error>>;
}

export function createStoryService(repository: StoryRepository): StoryService {
  return {
    async getUsersStories(userId) {
      const result = await repository.getStoriesByUser(userId);
      if (!result.ok) return err(new Error(result.error));
      return ok(result.data);
    },

    async createStory(story: StoryCreate) {
      if (!story.title.trim()) return err("Title cannot be empty");
      if (!story.description.trim()) return err("Description cannot be empty");
      const newStory: StoryCreate = {
        ownerId: story.ownerId,
        title: story.title,
        description: story.description,
        slug: story.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      }

      const result = await repository.create(newStory);
      if (!result.ok) return err(result.error);
      return ok(result.data);
    },

    async getStoryById(storyId) {
      const result = await repository.getStoryById(storyId);
      if (!result.ok) return err(new Error(result.error));
      return ok(result.data);
    },

    async updateStory(storyId, title, content) {
      if (!title.trim()) return err(new Error("Title cannot be empty"));
      if (!content.trim()) return err(new Error("Content cannot be empty"));

      const result = await repository.update(storyId, title, content);
      if (!result.ok) return err(new Error(result.error));
      return ok(undefined);
    },

    async deleteStory(storyId) {
      const result = await repository.delete(storyId);
      if (!result.ok) return err(new Error(result.error));
      return ok(undefined);
    },
  };
}
