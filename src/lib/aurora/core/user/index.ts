import { createInMemoryProfileRepo, createSupabaseProfileRepo } from './profile.repo';
import { createProfileService } from './profile.service';

const profileRepo = createSupabaseProfileRepo();
export const profileService = createProfileService(profileRepo);
