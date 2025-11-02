'use client';

import { Card, CardContent } from '@/lib/shared/components/ui/card';
import SynopsisCard from './synopsis-card';
import type { Folder, File, Manuscript } from '@/lib/aurora/core/types/manuscript';

export type SynopsisCardProps = {
  id: string;
  title: string;
  synopsis: string;
};

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
          labels: [{ label: 'Draft', value: 'draft', color: '#FF0000' }],
        },
        {
          type: 'file',
          name: 'Scene 2.md',
          id: '2',
          slug: 'scene-2',
          hoverSynopsis: 'The second scene',
          labels: [{ label: 'Draft', value: 'draft', color: '#FF0000' }],
          status: { label: 'In Progress', value: 'in-progress', color: '#00FF00' },
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

// Recursive search function
function findItemBySlug(items: (Folder | File)[], slug: string): Folder | File | undefined {
  for (const item of items) {
    if (item.slug === slug) return item;
    if (item.type === 'folder' && item.children) {
      const found = findItemBySlug(item.children, slug);
      if (found) return found;
    }
  }
  return undefined;
}

export default function Cards({ fileSlug }: { fileSlug?: string }) {
  if (!fileSlug)
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center">
        Select a document
      </div>
    );

  const file = findItemBySlug(fakeData.content, fileSlug);

  if (!file) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center">
        File not found
      </div>
    );
  }

  if (file.type === 'file') {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center">
        This file has no sub-docs
      </div>
    );
  }

  if (!file.children || file.children.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center">
        This folder has no sub-docs
      </div>
    );
  }

  return (
    <Card className="flex-1">
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {file.children.map((item) => (
          <SynopsisCard
            key={item.id}
            id={item.id}
            title={item.name}
            labels={item.labels}
            status={item.status}
            synopsis={item.hoverSynopsis ?? ''}
          />
        ))}
      </CardContent>
    </Card>
  );
}
