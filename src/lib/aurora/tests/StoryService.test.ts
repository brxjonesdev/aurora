// lib/services/__tests__/StoryService.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { createStoryService } from "../core/services/StoryService";
import { createInMemoryStoryRepository } from "../core/repositories/implementations/in-memory/InMemoryStoryRepo";
import { StoryCreate } from "../core/types";


describe("StoryService", () => {
  let storyService: ReturnType<typeof createStoryService>;

  beforeEach(() => {
    const repo = createInMemoryStoryRepository();
    storyService = createStoryService(repo);
  });

  it("creates a story", async () => {
    const newStory: StoryCreate = {
        title: "Test Story",
        description: "This is a test story",
        slug: "test-story",
        ownerId: "u1"
    }
    const result = await storyService.createStory(newStory);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.title).toBe("Test Story");
    }
  });
});
