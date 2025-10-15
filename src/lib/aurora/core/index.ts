import { createInMemoryProfileRepo, createSupabaseProfileRepo } from "./user/profile.repo";
import { createProfileService } from "./user/profile.service";

const profileRepo = createSupabaseProfileRepo();
export const profileService = createProfileService(profileRepo);