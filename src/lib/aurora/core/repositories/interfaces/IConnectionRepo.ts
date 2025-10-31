// lib/repositories/interfaces/IConnectionRepository.ts
import {
  EventThreadConnection,
  EventEventConnection,
  EventDependencyConnection,
  ConnectionType,
} from "@/lib/aurora/core/types/connection";
import { Result } from "@/lib/utils";

export interface IConnectionRepository {
  // Create connections
  createEventToThreadConnection(
    eventID: string,
    threadID: string,
    type: ConnectionType
  ): Promise<Result<EventThreadConnection, string>>;

  createEventToEventConnection(
    eventID: string,
    toEventID: string,
    type: ConnectionType
  ): Promise<Result<EventEventConnection, string>>;
  // Remove connections
  removeEventToThreadConnection(
    connectionID: string
  ): Promise<Result<boolean, string>>;

  removeEventToEventConnection(
    connectionID: string
  ): Promise<Result<boolean, string>>;

  // Optional: query connections if needed
  getConnectionsByEvent(
    eventID: string
  ): Promise<Result<
    (EventThreadConnection | EventEventConnection | EventDependencyConnection)[],
    string
  >>;

  getConnectionsByStory(
    storyID: string
  ): Promise<Result<
    (EventThreadConnection | EventEventConnection | EventDependencyConnection)[],
    string
  >>;
}
