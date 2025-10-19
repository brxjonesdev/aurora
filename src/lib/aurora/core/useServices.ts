import { useMemo } from 'react';
import { createInMemoryStoryRepository } from './repositories/implementations/in-memory/InMemoryStoryRepo';
import { createInMemoryProfileRepo } from './../features/auth-&-user/profile.repo';
import { createInMemoryThreadRepository } from './repositories/implementations/in-memory/InMemoryThreadRepo';
import { createInMemoryEventRepository } from './repositories/implementations/in-memory/InMemoryEventRepo';
import { createInMemoryConnectionRepository } from './repositories/implementations/in-memory/InMemoryConnectionRepo';
import { createStoryService } from './services/StoryService';
import { createConnectionService } from './services/ConnectionService';
import { createEventService } from './services/EventService';
import { createThreadService } from './services/ThreadService';
import { createProfileService } from './../features/auth-&-user/profile.service';
import { createSupabaseStoryRepository } from './repositories/implementations/supabase/SupabaseStoryRepo';

export function useServices() {
  return useMemo(() => {
    const storyRepo = createSupabaseStoryRepository();
    const threadRepo = createInMemoryThreadRepository();
    const eventRepo = createInMemoryEventRepository();
    const connectionRepo = createInMemoryConnectionRepository();

    const storyService = createStoryService(storyRepo);
    const threadService = createThreadService(threadRepo);
    const eventService = createEventService(eventRepo);
    const connectionService = createConnectionService(connectionRepo);

    return {
      storyService,
      threadService,
      eventService,
      connectionService,
    };
  }, []);
}
