import { EventThreadConnection, EventEventConnection } from "@/lib/aurora/core/types/connection";
import { IConnectionRepository } from "../../interfaces/IConnectionRepo";

export function createInMemoryConnectionRepository(): IConnectionRepository {
  const eventThreads: EventThreadConnection[] = [];
  const eventEvents: EventEventConnection[] = [];

  return {
    // ===== EVENT → THREAD =====
    async getEventThreadById(id) {
      return eventThreads.find((c) => c.id === id) || null;
    },

    async getEventThreadByStoryId(storyId) {
      return eventThreads.filter((c) => c.storyId === storyId);
    },

    async getEventThreadByEventId(eventId) {
      return eventThreads.filter((c) => c.fromEventId === eventId);
    },

    async createEventThread(connection) {
      eventThreads.push(connection);
    },

    async deleteEventThread(id) {
      const idx = eventThreads.findIndex((c) => c.id === id);
      if (idx >= 0) eventThreads.splice(idx, 1);
    },

    // ===== EVENT → EVENT =====
    async getEventEventById(id) {
      return eventEvents.find((c) => c.id === id) || null;
    },

    async getEventEventByStoryId(storyId) {
      return eventEvents.filter((c) => c.storyId === storyId);
    },

    async getEventEventByEventId(eventId) {
      return eventEvents.filter(
        (c) => c.fromEventId === eventId || c.toEventId === eventId
      );
    },

    async createEventEvent(connection) {
      eventEvents.push(connection);
    },

    async deleteEventEvent(id) {
      const idx = eventEvents.findIndex((c) => c.id === id);
      if (idx >= 0) eventEvents.splice(idx, 1);
    },
  };
}