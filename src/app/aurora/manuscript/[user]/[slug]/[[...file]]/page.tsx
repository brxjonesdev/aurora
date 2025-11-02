import React from 'react';
import ManuscriptMenubar from '@/lib/aurora/features/manuscript/components/dashboard/menubar';
import Editor from '@/lib/aurora/features/manuscript/components/dashboard/editor';
import Cards from '@/lib/aurora/features/manuscript/components/dashboard/board';
import { redirect } from 'next/navigation';
import { Manuscript } from '@/lib/aurora/core/types/manuscript';
import ManuscriptDashboard from '@/lib/aurora/features/manuscript/components/dashboard/manuscript-dashboard';

const fakeData: Manuscript = {
  id: '1',
  storyId: 'story-1',
  content: [
  {
    id: "1",
    type: "folder",
    slug: "chapter-1",
    name: "Chapter 1",
    children: [
      { type: "file", name: "Scene 1.md", id: "1", slug: "scene-1", hoverSynopsis: "The opening scene" },
      { type: "file", name: "Scene 2.md", id: "2", slug: "scene-2", hoverSynopsis: "The second scene" },
    ],
    hoverSynopsis: "The first chapter of the story",
  },
  {
    type: "file",
    name: "Introduction.md",
    id: "3",
    slug: "introduction",
    hoverSynopsis: "Introduction to the story",
  },
],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalWordCount: 0,
  totalCharacterCount: 0,
}


export default async function ManuscriptPage({
  params,
  searchParams,
}: {
  params: Promise<{ user: string; slug: string; file?: string }>;
  searchParams: Promise<{ view: "editor" | "cards"}>;
}) {
  const { user, slug, file } = await params;
  const { view } = await searchParams;
  if (!view) {
    redirect(`?view=cards`);
  }
  // const result = await service.getManucriptBySlug(user, slug);
  const manuscript: Manuscript = fakeData;

  // file is just the slug of the file or folder being viewed
 if (!file){
    redirect(`/aurora/manuscript/${user}/${slug}/${manuscript.content[0].slug}`);
 }
  // const result = await 
  return (
  <section className="p-4 flex-1 flex flex-col gap-2">
    <ManuscriptMenubar fileName={file} />
    <ManuscriptDashboard

        file={file[0]}
        defaultView={view ?? "cards"}
      />
  </section>);
}
