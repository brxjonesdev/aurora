import { useMemo } from 'react';
import { createSupabaseStoryRepository } from '../repositories/implementations/supabase/SupabaseStoryRepo';
import { createStoryService } from './StoryService';
import { createSupabaseManuscriptRepository } from '../repositories/implementations/supabase/SupabaseManuscriptRepo';
import createManuscriptService from './ManuscriptService';


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
