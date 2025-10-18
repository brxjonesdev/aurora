import { useMemo } from "react";

// ===== Repositories =====
import { createInMemoryStoryRepository } from "../repositories/implementations/in-memory/InMemoryStoryRepo";
import { createInMemoryProfileRepo } from "../user/profile.repo";
import { createInMemoryThreadRepository } from "../repositories/implementations/in-memory/InMemoryThreadRepo";
import { createInMemoryEventRepository } from "../repositories/implementations/in-memory/InMemoryEventRepo";
import { createInMemoryConnectionRepository } from "../repositories/implementations/in-memory/InMemoryConnectionRepo";
import { createStoryService } from "../services/StoryService";
import { createConnectionService } from "../services/ConnectionService";
import { createEventService } from "../services/EventService";
import { createThreadService } from "../services/ThreadService";
import { createProfileService } from "../user/profile.service";

// ===== Services =====


// ===== Hook =====
export function useServices() {
  // Memoize so instances don’t get recreated on every render
  return useMemo(() => {
    // --- Initialize repositories ---
    const storyRepo = createInMemoryStoryRepository();
    const profileRepo = createInMemoryProfileRepo();
    const threadRepo = createInMemoryThreadRepository();
    const eventRepo = createInMemoryEventRepository();
    const connectionRepo = createInMemoryConnectionRepository();

    // --- Initialize services ---
    const storyService = createStoryService(storyRepo);
    const profileService = createProfileService(profileRepo);
    const threadService = createThreadService(threadRepo);
    const eventService = createEventService(eventRepo);
    const connectionService = createConnectionService(connectionRepo);

    return {
      storyService,
      profileService,
      threadService,
      eventService,
      connectionService,
    };
  }, []);
}
