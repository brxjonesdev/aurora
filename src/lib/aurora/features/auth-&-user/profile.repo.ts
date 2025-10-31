import { Profile } from "./profile.service"
import { Result, ok, err } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

export interface ProfileRepo {
  findById(id: string): Promise<Profile | null>
  create(
    profile: Omit<Profile, "created_at" | "updated_at">
  ): Promise<Result<Profile, "username_taken" | "invalid_data" | "unknown_error">>
  update(
    id: string,
    updates: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
  ): Promise<Result<Profile, "invalid_data" | "unknown_error">>
  delete(id: string): Promise<void>
  checkUsernameAvailability(username: string): Promise<boolean>
}

export function createInMemoryProfileRepo(): ProfileRepo {
  const profiles = new Map<string, Profile>()

  console.log("Profile repo initialized")
  console.log("Reserved username: irene")
  console.log("Reserved username: john")

  return {
    async findById(id: string): Promise<Profile | null> {
      return profiles.get(id) || null
    },

    async create(
      profile: Omit<Profile, "created_at" | "updated_at">
    ): Promise<Result<Profile, "username_taken" | "invalid_data" | "unknown_error">> {
      if (profile.username.trim() === "irene" || profile.username.trim() === "john") {
        return err("username_taken")
      }

      const newProfile: Profile = {
        ...profile,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      profiles.set(newProfile.id, newProfile)
      console.log("Profile created:", newProfile)
      return ok(newProfile)
    },

    async update(
      id: string,
      updates: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
    ): Promise<Result<Profile, "invalid_data" | "unknown_error">> {
      const existingProfile = profiles.get(id)
      if (!existingProfile) return err("invalid_data")

      const updatedProfile = {
        ...existingProfile,
        ...updates,
        updated_at: new Date().toISOString(),
      }

      profiles.set(id, updatedProfile)
      return ok(updatedProfile)
    },

    async delete(id: string): Promise<void> {
      profiles.delete(id)
    },

    async checkUsernameAvailability(username: string): Promise<boolean> {
      const reserved = ["irene", "john"]
      if (reserved.includes(username.trim().toLowerCase())) return false

      for (const profile of profiles.values()) {
        if (profile.username === username) return false
      }
      return true
    },
  }
}

export function createSupabaseProfileRepo(): ProfileRepo {
    const supabase = createClient()
  return {
    async findById(id: string): Promise<Profile | null> {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single()
      if (error) return null
      return data as Profile
    },

    async create(
      profile: Omit<Profile, "created_at" | "updated_at">
    ): Promise<Result<Profile, "username_taken" | "invalid_data" | "unknown_error">> {
      const { data, error } = await supabase.from('profiles').insert({
        full_name: profile.full_name,
        username: profile.username,
        avatar_id: profile.avatar_id,
        onboarded: profile.onboarded,
        user_id: profile.id

      }).select().single()
        if (error) {
            console.error("Supabase error:", error)
            if (error.code === '23505') { // Unique violation
                return err("username_taken")
            }
        }
        if (data) {
            return ok(data as Profile)
        }
      return err("unknown_error")
    },

    async update(
      id: string,
      updates: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
    ): Promise<Result<Profile, "invalid_data" | "unknown_error">> {
      // TODO: Implement Supabase update
      // const { data, error } = await supabase.from('profiles').update(updates).eq('id', id).select().single()
      // if (error) return err('invalid_data')
      // return ok(data as Profile)
      return err("unknown_error")
    },

    async delete(id: string): Promise<void> {
      // TODO: Implement Supabase delete
      // await supabase.from('profiles').delete().eq('id', id)
    },

    async checkUsernameAvailability(username: string): Promise<boolean> {
      // TODO: Check username availability in Supabase
      // const { data } = await supabase.from('profiles').select('id').eq('username', username)
      // return data.length === 0
      return true
    },
  }
}
