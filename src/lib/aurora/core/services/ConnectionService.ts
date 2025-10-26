import { Result, err } from "@/lib/utils";
import { IConnectionRepository } from "../repositories/interfaces/IConnectionRepo";
import {
  ConnectionType,
  EventThreadConnection,
  EventEventConnection,
} from "@/lib/aurora/core/types/connection";

export interface IConnectionService {
  createEventToThreadConnection(data: {
    fromEventId: string;
    toThreadId: string;
    type: ConnectionType;
  }): Promise<Result<EventThreadConnection, string>>;

  createEventToEventConnection(data: {
    fromEventId: string;
    toEventId: string;
    type: ConnectionType;
  }): Promise<Result<EventEventConnection, string>>;

  deleteConnection(connectionId: string): Promise<Result<boolean, string>>;

  getConnectionsByStory(
    storyId: string
  ): Promise<Result<(EventThreadConnection | EventEventConnection)[], string>>;

  getConnectionsByEvent(
    eventId: string
  ): Promise<Result<(EventThreadConnection | EventEventConnection)[], string>>;
}

export function createConnectionService(
  repository: IConnectionRepository
): IConnectionService {
  return {
    async createEventToThreadConnection() {
      return err("not impl");
    },

    async createEventToEventConnection() {
      return err("not impl");
    },

    async deleteConnection() {
      return err("not impl");
    },

    async getConnectionsByStory() {
      return err("not impl");
    },

    async getConnectionsByEvent() {
      return err("not impl");
    },
  };
}
