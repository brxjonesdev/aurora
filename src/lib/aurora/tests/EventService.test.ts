import { describe, it, expect, beforeEach, vi } from "vitest";
import { createEventService, IEventService } from "../core/services/EventService";
import { IEventsRepository } from "../core/repositories/interfaces/IEventsRepo";


describe("EventService", () => {
    let mockRepo: IEventsRepository;
    let eventService: IEventService;

    beforeEach(()=> {
        mockRepo = {
            create: vi.fn(),
            getEventsByStory: vi.fn(),
            getEventById: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            bulkUpdate: vi.fn(),
        }
        eventService = createEventService(mockRepo)
    })

    describe("creating a new event on the story timeline", ()=> {
        it("should call the 'create' method of the repository with correct parameters", async ()=> {});
        it("should return the newly created event", async ()=> {});
        it("should handle errors thrown by the repository", async ()=> {});
        it("should validate input data before creating an event", async ()=> {});

    })
    describe("updating details of an existing event", ()=> {
        it("shoudl call the 'update' method of the repository with correct parameters", async ()=> {});
        it("should return the updated event", async ()=> {});
        it("should handle errors thrown by the repository", async ()=> {});
        it("should validate input data before updating an event", async ()=> {});
    })
    describe("deleting an event from the story timeline", ()=> {
        
    })
    describe("retrieving all events for a specific story")
    describe("retrieving a specific event by its ID")
    describe("bulk updating multiple events at once")
    describe("changing the order of events in the timeline")
    describe("changing the type of a specific event")
    describe("changing the tension level of a specific event")
    describe("retrieving events by chapter")
    describe("retrieving events by act")
    describe("retrieving events by scene")
    describe("retrieving events associated with a specific thread")


})