import { err } from "@/lib/utils";
import { ok } from "@/lib/utils";
import { IThreadsRepository } from "../../interfaces/IThreadsRepo";
import { Thread, ThreadUpdate } from "../../../types/thread";

export function createInMemoryThreadRepository(): IThreadsRepository {
    const threads: Thread[] = [];
    return {
        async create(thread: Thread) {
            threads.push(thread);
            return ok(thread);
        },

        async getThreadsByStory(storyId: string) {
            const storyThreads = threads.filter(t => t.storyId === storyId);
            return ok(storyThreads);
        },

        async getThreadById(threadId: string) {
            const thread = threads.find(t => t.id === threadId) || null;
            return ok(thread);
        },

        async update(threadId: string, updatedThread: ThreadUpdate) {
            const index = threads.findIndex(t => t.id === threadId);
            if (index === -1) return err("Thread not found");
            threads[index] = { ...threads[index], ...updatedThread, updatedAt: new Date().toDateString() };
            return ok(true);
        },

        async delete(threadId: string) {
            const index = threads.findIndex(t => t.id === threadId);
            if (index === -1) return err("Thread not found");
            threads.splice(index, 1);
            return ok(true);
        },

        async bulkUpdate(updates: { id: string; data: ThreadUpdate }[]) {
            for (const update of updates) {
                const index = threads.findIndex(t => t.id === update.id);
                if (index !== -1) {
                    threads[index] = { ...threads[index], ...update.data, updatedAt: new Date().toDateString() };
                }
            }
            return ok(true);  
        },
    };
}