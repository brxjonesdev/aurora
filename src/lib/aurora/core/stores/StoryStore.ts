import {createStore} from "zustand/vanilla";
import { Story } from "../types/story";


export type StoryState = {
    stories: Story[];
    loading: boolean;
}

export type StoryActions = {
    setStories: (stories: Story[]) => void;
    addStory: (story: Story) => void;
    removeStory: (storyId: Story["id"]) => void;
    updateStory: (storyId: Story["id"], updatedStory: Partial<Story>) => void;
}
export type StoryStore = StoryState & StoryActions;
export const initStoryState = (): StoryState => {
    return {
        stories: [],
        loading: false,
    }
}
export const defaultInitState: StoryState = {
    stories: [],
    loading: false,
}
export const createStoryStore = (
    initState: StoryState = defaultInitState) => createStore<StoryStore>((set) => ({
        ...initState,
        setStories: (stories) => set({stories}),
        addStory: (story) => set((state) => ({stories: [...state.stories, story]})),
        removeStory: (storyId) => set((state) => ({stories: state.stories.filter(s => s.id !== storyId)})),
        updateStory: (storyId, updatedStory) => set((state) => ({
            stories: state.stories.map(s => s.id === storyId ? {...s, ...updatedStory} : s)
        })),
    }))
