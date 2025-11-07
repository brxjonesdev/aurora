// store/apricity-store.ts

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

import { createStorySlice, StorySlice } from "./slices/story-slice";
import { createManuscriptSlice, ManuscriptSlice } from "./slices/manuscript-slice";

// 1) Build an overall Store type
export type ApricityStore = StorySlice & ManuscriptSlice;

// 2) Actually create the store
export const useApricityStore = create<ApricityStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...args) => ({
          ...createStorySlice(...args),
          ...createManuscriptSlice(...args),
        }))
      ),
      {
        name: "apricity-store",
        partialize: (state) => state, // or choose certain keys if needed
      }
    ),
    { name: "ApricityStore" }
  )
);
