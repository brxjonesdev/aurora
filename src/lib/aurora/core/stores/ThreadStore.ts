import {createStore} from "zustand/vanilla";
import { PlotThread } from "../types";

export type ThreadState = {
    threads: PlotThread[];
    loading: boolean;
}

export type ThreadActions = {
    setThreads: (threads: PlotThread[]) => void;
    addThread: (thread: PlotThread) => void;
    removeThread: (threadId: PlotThread["id"]) => void;
    updateThread: (threadId: PlotThread["id"], updatedThread: Partial<PlotThread>) => void;
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
    initState: ThreadState = defaultInitState) => createStore<ThreadStore>((set, get) => ({
        ...initState,
        setThreads: (threads) => set({threads}),
        addThread: (thread) => set((state) => ({threads: [...state.threads, thread]})),
        removeThread: (threadId) => set((state) => ({threads: state.threads.filter(t => t.id !== threadId)})),
        updateThread: (threadId, updatedThread) => set((state) => ({
            threads: state.threads.map(t => t.id === threadId ? {...t, ...updatedThread} : t)
        })),
    }))