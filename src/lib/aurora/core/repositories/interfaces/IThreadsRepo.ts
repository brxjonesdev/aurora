import { Result } from '@/lib/utils';
import { ThreadCreate, Thread, ThreadUpdate } from '@/lib/aurora/core/types/thread';

export interface IThreadsRepository {
  create(thread: ThreadCreate): Promise<Result<Thread, string>>;
  getThreadsByStory(storyId: string): Promise<Result<Thread[], string>>;
  getThreadById(threadId: string): Promise<Result<Thread | null, string>>;
  update(threadId: string, data: ThreadUpdate): Promise<Result<boolean, string>>;
  delete(threadId: string): Promise<Result<boolean, string>>;
  bulkUpdate(updates: { id: string; data: ThreadUpdate }[]): Promise<Result<boolean, string>>;
}
