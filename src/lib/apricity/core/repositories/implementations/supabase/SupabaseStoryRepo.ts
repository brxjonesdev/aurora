import { Result, err, ok } from '@/lib/utils';

import { IStoryRepository } from '../../interfaces/IStoriesRepo';
import { createClient } from '@/lib/supabase/client';
import { Story, StoryCreate } from '../../../types/story';


export function createSupabaseStoryRepository(): IStoryRepository {
  const supabase = createClient();
  return {
    create: async function (story: StoryCreate): Promise<Result<Story, string>> {
  const { title, description, ownerId, slug, storyId } = story;

  const { data: storyData, error: storyError } = await supabase
    .from('stories')
    .insert([{ title, description, owner_id: ownerId, slug, story_id: storyId }])
    .select()
    .single();
  if (storyError) return err(storyError.message);

  const newManuscript = {
    story_id: storyData.story_id,
    title,
    root_folder_id: null,
  };

  const { data: manuscriptData, error: manuscriptError } = await supabase
    .from('manuscripts')
    .insert([newManuscript])
    .select()
    .single();
  if (manuscriptError) return err(manuscriptError.message);

  const { data: rootFolder, error: rootError } = await supabase
    .from('manuscript_nodes')
    .insert([
      {
        manuscript_id: manuscriptData.id,
        name: 'Manuscript',
        slug: null,
        parent_id: null,
        type: 'folder',
        labels: [],
        status: null,
      }
    ])
    .select()
    .single();
  if (rootError) return err(rootError.message);

  await supabase
    .from('manuscripts')
    .update({ root_folder_id: rootFolder.id })
    .eq('id', manuscriptData.id);




  // Return story w/ manuscript
  const newStoryWithManuscript: Story = {
    ...storyData,
    manuscripts: [
      {
        id: manuscriptData.id,
        root_folder_id: rootFolder.id,
      },
    ],
  };

  return ok(newStoryWithManuscript);
},


    getStoriesByUser: async function (userId: string): Promise<Result<Story[], string>> {
      const { data, error } = await supabase
        .from('stories')
        .select(
          `
    *,
    manuscripts (id, root_folder_id)
  `
        )
        .eq('owner_id', userId);

      if (error) return err(error.message);
      return ok(data as Story[]);
    },
    getStoryBySlug: async function (
      userId: string,
      slug: string
    ): Promise<Result<Story | null, string>> {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('owner_id', userId)
        .eq('slug', slug)
        .single();
      if (error) return err(error.message);
      console.log(
        'SupabaseStoryRepo - getStoryBySlug data:',
        data,
        ' for userId:',
        userId,
        ' and slug:',
        slug
      );
      return ok(data as Story | null);
    },
    getStoryById: function (storyId: string): Promise<Result<Story | null, string>> {
      throw new Error('Function not implemented.');
    },
    update: function (
      storyId: string,
      title: string,
      content: string
    ): Promise<Result<void, string>> {
      throw new Error('Function not implemented.');
    },
    delete: function (storyId: string): Promise<Result<void, string>> {
      throw new Error('Function not implemented.');
    },
  };
}
