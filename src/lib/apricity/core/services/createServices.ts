// lib/services/serverServices.ts

import { createSupabaseManuscriptRepository } from '../repositories/implementations/supabase/SupabaseManuscriptRepo';
import { createSupabaseStoryRepository } from '../repositories/implementations/supabase/SupabaseStoryRepo';
import createManuscriptService from './ManuscriptService';
import { createStoryService } from './StoryService';

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
