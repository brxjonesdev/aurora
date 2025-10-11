export interface Story {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

export interface StoryCreate {
  title: string;
  description?: string;
  ownerId: string;
}
