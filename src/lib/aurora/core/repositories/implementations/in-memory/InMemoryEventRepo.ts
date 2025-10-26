import { IEventsRepository } from "../../interfaces/IEventsRepo";
import { err, ok, Result } from "@/lib/utils";
import { Event, EventCreate, EventUpdate } from "../../../types/event";


export function createInMemoryEventRepository(): IEventsRepository {
  let events: Event[] = [];

  return {
    async create(event: EventCreate): Promise<Result< Event, string>> {
      const newEvent:  Event = {
        id: String(events.length + 1),
        ...event,
        position: events.filter((e) => e.storyId === event.storyId).length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      events = [...events, newEvent];
      return ok(newEvent);
    },

    async getEventsByStory(storyId: string): Promise<Result< Event[], string>> {
      const storyEvents = events.filter((e) => e.storyId === storyId);
      return ok(storyEvents);
    },

    async getEventById(eventId: string): Promise<Result< Event | null, string>> {
      const event = events.find((e) => e.id === eventId) ?? null;
      return ok(event);
    },

    async update(eventId: string, data:  EventUpdate): Promise<Result<void, string>> {
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
      updates: { id: string; data:  EventUpdate }[]
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
