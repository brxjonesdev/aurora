import { createInMemoryRepository, createSupabaseRepository } from "./story-repo";
import { createStoryService } from "./story-services";

const storyRepo = createSupabaseRepository();
export const storyService = createStoryService(storyRepo);