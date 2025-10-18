import { Result } from "@/lib/utils";
import { PlotEventCreate, PlotEvent, PlotEventUpdate } from "../../types";

export interface IEventsRepository {
    create(event: PlotEventCreate): Promise<Result<PlotEvent, string>>;
    getEventsByStory(storyId: string): Promise<Result<PlotEvent[], string>>;
    getEventById(eventId: string): Promise<Result<PlotEvent | null, string>>;
    update(eventId: string, data: PlotEventUpdate): Promise<Result<void, string>>;
    delete(eventId: string): Promise<Result<void, string>>;
    bulkUpdate(updates: { id: string; data: PlotEventUpdate }[]): Promise<Result<void, string>>;
}