// lib/repositories/interfaces/IConnectionRepository.ts

import { EventThreadConnection, EventEventConnection } from "@/lib/aurora/core/types/connection";

export interface IConnectionRepository {
  // Event-Thread Connections
  getEventThreadById(id: string): Promise<EventThreadConnection | null>;
  getEventThreadByStoryId(storyId: string): Promise<EventThreadConnection[]>;
  getEventThreadByEventId(eventId: string): Promise<EventThreadConnection[]>;
  createEventThread(connection: EventThreadConnection): Promise<void>;
  deleteEventThread(id: string): Promise<void>;
  
  // Event-Event Connections
  getEventEventById(id: string): Promise<EventEventConnection | null>;
  getEventEventByStoryId(storyId: string): Promise<EventEventConnection[]>;
  getEventEventByEventId(eventId: string): Promise<EventEventConnection[]>;
  createEventEvent(connection: EventEventConnection): Promise<void>;
  deleteEventEvent(id: string): Promise<void>;
}