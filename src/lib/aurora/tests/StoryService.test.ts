import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStoryService } from "../core/services/StoryService";
import { IStoryRepository } from "../core/repositories/interfaces/IStoriesRepo";


describe("StoryService", () => {
  let mockRepo: IStoryRepository;
  let storyService: ReturnType<typeof createStoryService>

  beforeEach(()=> {
    mockRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getStoriesByUser: vi.fn(),
      getStoryById: vi.fn(),
    }
    storyService = createStoryService(mockRepo)
  })

  describe("getting stories that belong to a user", ()=> {
    it("should return stories that belong to a valid user", async ()=> {});
    it("should handle if the user is invalid or does not exist", async ()=> {});
    it("should return an empty array if the user has no stories", async ()=> {});
    it("should handle repository errors gracefully", async ()=> {});
  })

  describe("getting an individual story by ID", ()=> {
    it("should return the story for the given valid ID", async ()=> {});
    it("should handle if the story ID does not exist", async ()=> {});
    it("should handle repository errors gracefully", async ()=> {});
    it("should handle if an invalid, malformed or missing ID is provided", async ()=> {});
  });

  describe("creating a story", ()=> {
    it("should create a story given valid input", async ()=> {});
    it("should handle missing title", async ()=> {});
    it("should handle missing description", async ()=> {});
    it("should have a valid ownerId", async ()=> {});
    it("should handle repository errors gracefully", async ()=> {});
    it("should have a default slug generated from the title", async ()=> {});
    it("should trim whitespace from title and description", async ()=> {});
    it("should have default settings applied if none are provided", async ()=> {});
  });

  describe("updating a story", ()=> {
    it("should update a story given valid input", async ()=> {});
    it("should handle a missing or valid id", async ()=> {});
    it("should return the updated story on success, and update local state", async ()=> {});
    it("should handle repository errors gracefully", async ()=> {}); 
  });

  describe("deleting a story", ()=> {
    it("should delete a story given a valid ID", async ()=> {});
    it("should handle a missing or invalid ID", async ()=> {});
    it("should handle repository errors gracefully", async ()=> {});
    it("should ensure the story is removed from local state upon successful deletion", async ()=> {});
  });
});