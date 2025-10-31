
import { ok, err, Result } from "@/lib/utils";
import { IStoryRepository } from "../repositories/interfaces/IStoriesRepo";
import { Story, StoryCreate, StoryUpdate } from "../types/story";



export function createStoryService(repository: IStoryRepository){
  return {
    async getUsersStories(userId: string): Promise<Result<Story[], Error>> {
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

    async getStoryById(storyId: string) {
      const result = await repository.getStoryById(storyId);
      if (!result.ok) return err(new Error(result.error));
      return ok(result.data);
    },

    async updateStory(data: StoryUpdate) {
      if (!data || !data.title || !data.title.trim()) return err(new Error("Title cannot be empty"));
      if (!data || !data.description || !data.description.trim()) return err(new Error("Description cannot be empty"));

      const result = await repository.update(data.id, data.title, data.description);
      if (!result.ok) return err(new Error(result.error));
      return ok(undefined);
    },

    async deleteStory(storyId: string) {
      const result = await repository.delete(storyId);
      if (!result.ok) return err(new Error(result.error));
      return ok(undefined);
    },
  };
}
