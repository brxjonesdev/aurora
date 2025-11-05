import React from 'react';
import ManuscriptMenubar from '@/lib/aurora/features/manuscript/components/dashboard/menubar/menubar';
import { redirect } from 'next/navigation';
import { Manuscript } from '@/lib/aurora/core/types/manuscript';
import ManuscriptDashboard from '@/lib/aurora/features/manuscript/components/dashboard/manuscript-dashboard';
import { createClient } from '@/lib/supabase/server';
import { checkAuthenticated } from '@/lib/aurora/features/auth-&-user/utils';
const fakeData: Manuscript = {
  id: '1',
  storyId: 'story-1',
  content: [
    {
      id: '1',
      type: 'folder',
      slug: 'chapter-1',
      name: 'Chapter 1',
      children: [
        {
          type: 'file',
          name: 'Scene 1.md',
          id: '1',
          slug: 'scene-1',
          hoverSynopsis: 'The opening scene',
        },
        {
          type: 'file',
          name: 'Scene 2.md',
          id: '2',
          slug: 'scene-2',
          hoverSynopsis: 'The second scene',
        },
      ],
      hoverSynopsis: 'The first chapter of the story',
    },
    {
      type: 'file',
      name: 'Introduction.md',
      id: '3',
      slug: 'introduction',
      hoverSynopsis: 'Introduction to the story',
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalWordCount: 0,
  totalCharacterCount: 0,
};

export default async function ManuscriptPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; slug: string; file?: string }>;
  searchParams: Promise<{ view: 'editor' | 'cards' }>;
}) {
  const { username, slug, file } = await params;
  const { view } = await searchParams;
  const supabase = await createClient();
  await checkAuthenticated({ supabase, username });
  if (!view) {
    redirect(`?view=cards`);
  }
  // const result = await service.getManucriptBySlug(user, slug);
  const manuscript: Manuscript = fakeData;
  if (!file) {
    redirect(`/aurora/manuscript/${username}/${slug}/${manuscript.content[0].slug}`);
  }
  return (
    <section className="flex flex-1 flex-col gap-2 p-4">
      <ManuscriptMenubar fileName={file[0]} />
      <ManuscriptDashboard file={file[0]} defaultView={view ?? "cards"}/>
    </section>
  );
}
