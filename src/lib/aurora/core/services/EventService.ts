import { Result, err, ok } from "@/lib/utils";
import { EventCreate, Event, EventType, MoveEventRef} from "@/lib/aurora/core/types/event";
import { IEventsRepository } from "../repositories/interfaces/IEventsRepo";

export interface IEventService {
  createNewEvent(data: EventCreate): Promise<Result<Event, string>>;
  deleteEvent(eventId: string): Promise<Result<boolean, string>>;
  getStoryEvents(storyId: string): Promise<Result<Event[], string>>;
  getEventById(eventId: string): Promise<Result<Event | null, string>>;
  bulkUpdateEvents(updates: { id: string; data: EventCreate }[]): Promise<Result<boolean, string>>;
  changeEventOrder(eventID: string, ref: MoveEventRef): Promise<Result<boolean, string>>;
  changeType(eventId: string, type: EventType): Promise<Result<boolean, string>>;
  changeTensionLevel(eventId: string, tensionLevel: number): Promise<Result<boolean, string>>;
  getEventsByChapter(storyId: string, chapter: number): Promise<Result<Event[], string>>;
  getEventsByAct(storyId: string, act: number): Promise<Result<Event[], string>>;
  getEventsByScene(storyId: string, scene: number): Promise<Result<Event[], string>>;
  getThreadEvents(threadId: string): Promise<Result<Event[], string>>;
}

export function createEventService(repository: IEventsRepository): IEventService {
  return {
    async createNewEvent(data: EventCreate): Promise<Result<Event, string>> {
      return err("Not implemented");
    },
    async deleteEvent(eventId: string): Promise<Result<boolean, string>> {
      return err("Not implemented");
    },
    async getStoryEvents(storyId: string): Promise<Result<Event[], string>> {
      return err("Not implemented");
    },
    async getEventById(eventId: string): Promise<Result<Event | null, string>> {
      return err("Not implemented");
    },
    async bulkUpdateEvents(updates: { id: string; data: EventCreate }[]): Promise<Result<boolean, string>> {
      return err("Not implemented");
    },
    async changeEventOrder(eventID: string, ref: MoveEventRef): Promise<Result<boolean, string>> {
      return err("Not implemented");
    },
    async changeType(eventId: string, type: EventType): Promise<Result<boolean, string>> {
      return err("Not implemented");
    },
    async changeTensionLevel(eventId: string, tensionLevel: number): Promise<Result<boolean, string>> {
      return err("Not implemented");
    },
    async getEventsByChapter(storyId: string, chapter: number): Promise<Result<Event[], string>> {
      return err("Not implemented");
    },
    async getEventsByAct(storyId: string, act: number): Promise<Result<Event[], string>> {
      return err("Not implemented");
    },
    async getEventsByScene(storyId: string, scene: number): Promise<Result<Event[], string>> {
      return err("Not implemented");
    },
    async getThreadEvents(threadId: string): Promise<Result<Event[], string>> {
      return err("Not implemented");
    },
  };
}

