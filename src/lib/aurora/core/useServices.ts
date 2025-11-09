import { useMemo } from 'react';
import { createInMemoryStoryRepository } from './repositories/implementations/in-memory/InMemoryStoryRepo';
import { createInMemoryProfileRepo } from './../features/auth-&-user/profile.repo';
import { createStoryService } from './services/StoryService';
import { createProfileService } from './../features/auth-&-user/profile.service';
import { createSupabaseStoryRepository } from './repositories/implementations/supabase/SupabaseStoryRepo';
import createManuscriptService from './services/ManuscriptService';
import { createSupabaseManuscriptRepository } from './repositories/implementations/supabase/SupabaseManuscriptRepo';


export function useServices() {
  return useMemo(() => {
    const storyRepo = createSupabaseStoryRepository();
    const storyService = createStoryService(storyRepo);

    const manuscriptRepo = createSupabaseManuscriptRepository();
    const manuscriptService = createManuscriptService(manuscriptRepo);

    return {
      storyService,
      manuscriptService,
    };
  }, []);
}
