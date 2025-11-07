// lib/services/serverServices.ts
import { createInMemoryStoryRepository } from './repositories/implementations/in-memory/InMemoryStoryRepo';
import { createStoryService } from './services/StoryService';
import { createSupabaseStoryRepository } from './repositories/implementations/supabase/SupabaseStoryRepo';
import { createInMemoryManuscriptRepository } from './repositories/implementations/in-memory/InMemoryManuscriptRepo';
import createManuscriptService from './services/ManuscriptService';
import { createSupabaseManuscriptRepository } from './repositories/implementations/supabase/SupabaseManuscriptRepo';

/**
 * Creates all repositories and services for use in a Server Component or Server Action.
 * This function is safe to call in any non-reactive context (e.g., loaders, server actions).
 */
export function createServices() {
  const storyRepo = createSupabaseStoryRepository();
  const storyService = createStoryService(storyRepo);

  const manuscriptRepo = createSupabaseManuscriptRepository();
  const manuscriptService = createManuscriptService(manuscriptRepo);

  return {
    storyService,
    manuscriptService,
  };
}
