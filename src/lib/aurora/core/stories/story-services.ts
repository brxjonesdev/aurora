import { Story } from './types';
import { ok, err, Result } from '@/lib/utils';
interface StoryService {
  getUsersStories: (userId: string) => Promise<Result<Story[], Error>>;
}
export const storyService: StoryService = {
  getUsersStories: async (userId: string) => {
    return ok([
      {
        id: '1',
        title: 'My First Story',
        slug: 'my-first-story',
        description: 'This is the description of my first story.',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: userId,
      },
      {
        id: '2',
        title: 'My Second Story',
        slug: 'my-second-story',
        description: 'This is the description of my second story.',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: userId,
      },
    ]);
  },
};
