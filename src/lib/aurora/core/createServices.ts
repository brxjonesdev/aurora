// lib/services/serverServices.ts
import { createInMemoryStoryRepository } from './repositories/implementations/in-memory/InMemoryStoryRepo';
import { createStoryService } from './services/StoryService';
import { createSupabaseStoryRepository } from './repositories/implementations/supabase/SupabaseStoryRepo';

/**
 * Creates all repositories and services for use in a Server Component or Server Action.
 * This function is safe to call in any non-reactive context (e.g., loaders, server actions).
 */
export function createServices() {
  const storyRepo = createSupabaseStoryRepository();
  const storyService = createStoryService(storyRepo);

  return {
    storyService,
  };
}
