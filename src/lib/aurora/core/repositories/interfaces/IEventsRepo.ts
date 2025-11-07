import { Result } from '@/lib/utils';


export interface IEventsRepository {
  create(event: EventCreate): Promise<Result<Event, string>>;
  getEventsByStory(storyId: string): Promise<Result<Event[], string>>;
  getEventById(eventId: string): Promise<Result<Event | null, string>>;
  update(eventId: string, data: EventUpdate): Promise<Result<void, string>>;
  delete(eventId: string): Promise<Result<void, string>>;
  bulkUpdate(updates: { id: string; data: EventUpdate }[]): Promise<Result<void, string>>;
}
