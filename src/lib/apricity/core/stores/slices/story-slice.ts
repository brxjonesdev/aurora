/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand'
import { Story } from "../../types/story"
import { ApricityStore } from '../apricity-store'

export type StorySliceState = {
    stories: Story[]
    errors: Record<string, string>
}

export type StorySliceActions = {
    setStories: (stories: Story[]) => void
    addStory: (story: Story) => void
    updateStory: (story: Story) => void
    removeStory: (storyId: string) => void
    setError: (storyId: string, error: string) => void
    clearError: (storyId: string) => void
}

export type StorySlice = StorySliceState & StorySliceActions

export const createStorySlice: StateCreator<ApricityStore, [["zustand/immer", never]], [], StorySlice> = (set) => ({
    stories: [],
    errors: {},

    setStories: (stories) => set({ stories }),

    addStory: (story) => set((state) => ({ 
        stories: [...state.stories, story] 
    })),

    updateStory: (story) => set((state) => ({
        stories: state.stories.map(s => s.id === story.id ? story : s)
    })),

    removeStory: (storyId) => set((state) => ({
        stories: state.stories.filter(s => s.id !== storyId)
    })),

    setError: (storyId, error) => set((state) => ({
        errors: { ...state.errors, [storyId]: error }
    })),

    clearError: (storyId) => set((state) => {
        const { [storyId]: _, ...rest } = state.errors
        return { errors: rest }
    })
})