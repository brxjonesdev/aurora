import {createStore} from "zustand/vanilla";
import { PlotEvent } from "../types";

export type EventState = {
    events: PlotEvent[];
    loading: boolean;
}

export type EventActions = {
    setEvents: (events: PlotEvent[]) => void;
    addEvent: (event: PlotEvent) => void;
    removeEvent: (eventId: PlotEvent["id"]) => void;
    updateEvent: (eventId: PlotEvent["id"], updatedEvent: Partial<PlotEvent>) => void;
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
