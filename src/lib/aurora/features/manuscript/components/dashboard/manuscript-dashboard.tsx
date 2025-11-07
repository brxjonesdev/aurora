'use client';

import { useSearchParams } from 'next/navigation';
import Editor from '@/lib/aurora/features/manuscript/components/dashboard/editor';
import Cards from '@/lib/aurora/features/manuscript/components/dashboard/board';
import type { Manuscript } from '@/lib/aurora/core/types/manuscript';

type Props = {
  file: string;
  defaultView: 'editor' | 'cards';
};

export default function ManuscriptDashboard({ file, defaultView }: Props) {
  const searchParams = useSearchParams();
  const view = (searchParams.get('view') as 'editor' | 'cards') ?? defaultView;

  return (
    <div className="flex flex-1 flex-col gap-2">
      {view === 'editor' ? <Editor fileSlug={file} /> : <Cards fileSlug={file} />}
    </div>
  );
}
