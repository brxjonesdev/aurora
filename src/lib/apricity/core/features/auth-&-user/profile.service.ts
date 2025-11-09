import { ProfileRepo } from './profile.repo';
import { Result, ok, err } from '@/lib/utils';

export interface Profile {
  id: string;
  full_name: string;
  username: string;
  avatar_id: string | null;
  onboarded: boolean;
  created_at: string;
  updated_at: string;
}

interface ProfileService {
  getProfileById(id: string): Promise<Profile | null>;
  createProfile(
    profile: Omit<Profile, 'created_at' | 'updated_at'>
  ): Promise<Result<Profile, 'username_taken' | 'invalid_data' | 'unknown_error'>>;
  updateProfile(
    id: string,
    updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<Result<Profile, 'invalid_data' | 'unknown_error'>>;
  deleteProfile(id: string): Promise<void>;
  checkUsernameAvailability(username: string): Promise<boolean>;
}

export function createProfileService(repo: ProfileRepo): ProfileService {
  return {
    async getProfileById(id: string): Promise<Profile | null> {
      const profile = await repo.findById(id);
      return profile || null;
    },
    async createProfile(
      profile: Omit<Profile, 'created_at' | 'updated_at'>
    ): Promise<Result<Profile, 'username_taken' | 'invalid_data' | 'unknown_error'>> {
      // validation
      if (!profile.full_name || profile.full_name.trim() === '') {
        return err('invalid_data');
      }

      const createdProfileResult = await repo.create(profile);
      if (!createdProfileResult.ok) {
        if (createdProfileResult.error === 'username_taken') {
          return err('username_taken');
        }
        return err('unknown_error');
      }

      if (createdProfileResult.ok) {
        return ok(createdProfileResult.data);
      }

      return err('unknown_error');
    },
    async updateProfile(
      id: string,
      updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
    ): Promise<Result<Profile, 'invalid_data' | 'unknown_error'>> {
      const updatedProfileResult = await repo.update(id, updates);
      if (!updatedProfileResult.ok) {
        if (updatedProfileResult.error === 'invalid_data') {
          return err('invalid_data');
        }
        return err('unknown_error');
      }

      if (updatedProfileResult.ok) {
        return ok(updatedProfileResult.data);
      }

      return err('unknown_error');
    },
    async deleteProfile(id: string): Promise<void> {
      await repo.delete(id);
    },
    async checkUsernameAvailability(username: string): Promise<boolean> {
      return await repo.checkUsernameAvailability(username);
    },
  };
}
