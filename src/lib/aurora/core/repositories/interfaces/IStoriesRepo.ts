import { Result } from "@/lib/utils";
import { StoryCreate, Story } from "../../types";

export interface IStoryRepository {
  create(story: StoryCreate): Promise<Result<Story, string>>;
  getStoriesByUser(userId: string): Promise<Result<Story[], string>>;
  getStoryById(storyId: string): Promise<Result<Story | null, string>>;
  update(storyId: string, title: string, content: string): Promise<Result<void, string>>;
  delete(storyId: string): Promise<Result<void, string>>;
}