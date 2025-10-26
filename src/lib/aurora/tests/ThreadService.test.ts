import { describe, it, expect, beforeEach, vi } from "vitest";
import { createThreadService, IThreadsService } from "../core/services/ThreadService";
import { IThreadsRepository } from "../core/repositories/interfaces/IThreadsRepo";

describe("ThreadService", () => {
    let mockRepo: IThreadsRepository;
    let threadService: IThreadsService;

    beforeEach(()=> {
        mockRepo = {
            create: vi.fn(),
            getThreadsByStory: vi.fn(),
            getThreadById: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            bulkUpdate: vi.fn(),
        }
        threadService = createThreadService(mockRepo)
    })

});