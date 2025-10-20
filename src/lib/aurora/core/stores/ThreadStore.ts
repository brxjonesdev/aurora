import {createStore} from "zustand/vanilla";
import { Thread } from "../types/thread";


export type ThreadState = {
    threads: Thread[];
    loading: boolean;
}

export type ThreadActions = {
    setThreads: (threads: Thread[]) => void;
    addThread: (thread: Thread) => void;
    removeThread: (threadId: Thread["id"]) => void;
    updateThread: (threadId: Thread["id"], updatedThread: Partial<Thread>) => void;
}

export type ThreadStore = ThreadState & ThreadActions;

export const initThreadState = (): ThreadState => {
    return {
        threads: [],
        loading: false,
    }
}

export const defaultInitState: ThreadState = {
    threads: [],
    loading: false,
}

export const createThreadStore = (
    initState: ThreadState = defaultInitState) => createStore<ThreadStore>((set) => ({
        ...initState,
        setThreads: (threads) => set({threads}),
        addThread: (thread) => set((state) => ({threads: [...state.threads, thread]})),
        removeThread: (threadId) => set((state) => ({threads: state.threads.filter(t => t.id !== threadId)})),
        updateThread: (threadId, updatedThread) => set((state) => ({
            threads: state.threads.map(t => t.id === threadId ? {...t, ...updatedThread} : t)
        })),
    }))