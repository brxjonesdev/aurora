import {createStore} from "zustand/vanilla";

import { Event } from "../types/event";

export type EventState = {
    events: Event[];
    loading: boolean;
}

export type EventActions = {
    setEvents: (events: Event[]) => void;
    addEvent: (event: Event) => void;
    removeEvent: (eventId: Event["id"]) => void;
    updateEvent: (eventId: Event["id"], updatedEvent: Partial<Event>) => void;
}

export type EventStore = EventState & EventActions;

export const initEventState = (): EventState => {
    return {
        events: [],
        loading: false,
    }
}

export const defaultInitState: EventState = {
    events: [],
    loading: false,
}

export const createEventStore = (
    initState: EventState = defaultInitState) => createStore<EventStore>((set) => ({
        ...initState,
        setEvents: (events) => set({events}),
        addEvent: (event) => set((state) => ({events: [...state.events, event]})),
        removeEvent: (eventId) => set((state) => ({events: state.events.filter(e => e.id !== eventId)})),
        updateEvent: (eventId, updatedEvent) => set((state) => ({
            events: state.events.map(e => e.id === eventId ? {...e, ...updatedEvent} : e)
        })),
    }))
