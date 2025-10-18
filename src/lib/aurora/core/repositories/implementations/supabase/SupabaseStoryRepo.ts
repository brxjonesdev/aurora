import { Result, err, ok } from "@/lib/utils";
import { StoryCreate, Story } from "../../../types";
import { IStoryRepository } from "../../interfaces/IStoriesRepo";
import { createClient } from "@/lib/supabase/client";

export function createSupabaseRepository(): IStoryRepository {
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