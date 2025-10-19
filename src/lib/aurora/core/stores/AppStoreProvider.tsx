"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import { useStore } from "zustand";
import { createAppStore, AppStore } from "./AppStore";

// Create store context
type AppStoreApi = ReturnType<typeof createAppStore>;

const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

// Provider component
export function AppStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStoreApi | undefined>(undefined);
  
  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
}

// Hook to use the store
export function useAppStore<T>(selector: (state: AppStore) => T): T {
  const store = useContext(AppStoreContext);
  
  if (!store) {
    throw new Error("useAppStore must be used within AppStoreProvider");
  }
  
  return useStore(store, selector);
}

// Example usage in components:
// 
// function StoryList() {
//   const stories = useAppStore((state) => state.stories);
//   const addStory = useAppStore((state) => state.addStory);
//   
//   return (
//     <div>
//       {stories.map(story => <div key={story.id}>{story.title}</div>)}
//       <button onClick={() => addStory(newStory)}>Add</button>
//     </div>
//   );
// }
//
// function ThreadList() {
//   const threads = useAppStore((state) => state.threads);
//   const updateThread = useAppStore((state) => state.updateThread);
//   
//   return <div>...</div>;
// }