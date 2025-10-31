import { createStore } from 'zustand/vanilla'
import { StoryEvent } from '../types/events'

export type PlotweaverState = {
    events: StoryEvent[]
}

export type PlotweaverActions = {
    setEvents: (events: StoryEvent[]) => void
    addEvent: (event: StoryEvent) => void
    updateEvent: (updatedEvent: StoryEvent) => void
    removeEvent: (eventId: string) => void
}

export type PlotweaverStore = PlotweaverState & PlotweaverActions

export const defaultInitState: PlotweaverState = {
    events: [],
}

export const createPlotweaverStore = (
    initState: PlotweaverState = defaultInitState) => {
        return createStore<PlotweaverStore>()((set) => ({
            ...initState,
            setEvents: (events: StoryEvent[]) => set(() => ({ events })),
            addEvent: (event: StoryEvent) => set((state) => ({ events: [...state.events, event] })),
            updateEvent: (updatedEvent: StoryEvent) => set((state) => ({
                events: state.events.map((event) =>
                    event.id === updatedEvent.id ? updatedEvent : event
                ),
            })),
            removeEvent: (eventId: string) => set((state) => ({
                events: state.events.filter((event) => event.id !== eventId),
            })),
        }))
    }