import { Result } from "@/lib/utils";
import { PlotThreadCreate, PlotThread, PlotThreadUpdate } from "../../types";

export interface IThreadsRepository {
  create(thread: PlotThreadCreate): Promise<Result<PlotThread, string>>;
  getThreadsByStory(storyId: string): Promise<Result<PlotThread[], string>>;
  getThreadById(threadId: string): Promise<Result<PlotThread | null, string>>;
  update(threadId: string, data: PlotThreadUpdate): Promise<Result<boolean, string>>;
  delete(threadId: string): Promise<Result<boolean, string>>;
  bulkUpdate(updates: { id: string; data: PlotThreadUpdate }[]): Promise<Result<boolean, string>>;
}