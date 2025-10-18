import { IEventsRepository } from "../../interfaces/IEventsRepo";
import { err, ok, Result } from "@/lib/utils";
import { PlotEvent, PlotEventCreate, PlotEventUpdate } from "../../../types";

export function createInMemoryEventRepository(): IEventsRepository {
  let events: PlotEvent[] = [];

  return {
    async create(event: PlotEventCreate): Promise<Result<PlotEvent, string>> {
      const newEvent: PlotEvent = {
        id: String(events.length + 1),
        ...event,
        position: events.filter((e) => e.storyId === event.storyId).length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      events = [...events, newEvent];
      return ok(newEvent);
    },

    async getEventsByStory(storyId: string): Promise<Result<PlotEvent[], string>> {
      const storyEvents = events.filter((e) => e.storyId === storyId);
      return ok(storyEvents);
    },

    async getEventById(eventId: string): Promise<Result<PlotEvent | null, string>> {
      const event = events.find((e) => e.id === eventId) ?? null;
      return ok(event);
    },

    async update(eventId: string, data: PlotEventUpdate): Promise<Result<void, string>> {
      const index = events.findIndex((e) => e.id === eventId);
      if (index === -1) return err("Event not found");

      events[index] = {
        ...events[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      return ok(undefined);
    },

    async delete(eventId: string): Promise<Result<void, string>> {
      const exists = events.some((e) => e.id === eventId);
      if (!exists) return err("Event not found");

      events = events.filter((e) => e.id !== eventId);
      return ok(undefined);
    },

    async bulkUpdate(
      updates: { id: string; data: PlotEventUpdate }[]
    ): Promise<Result<void, string>> {
      for (const update of updates) {
        const index = events.findIndex((e) => e.id === update.id);
        if (index !== -1) {
          events[index] = {
            ...events[index],
            ...update.data,
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return ok(undefined);
    },
  };
}
