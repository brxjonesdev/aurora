'use client';

import { useSearchParams } from 'next/navigation';
import Editor from '@/lib/aurora/features/manuscript/components/dashboard/editor';
import Cards from '@/lib/aurora/features/manuscript/components/dashboard/board';

type Props = {
  file: string;
  defaultView: 'editor' | 'cards';
};

export default function ManuscriptDashboard({ file, defaultView }: Props) {
  const searchParams = useSearchParams();
  const view = (searchParams.get('view') as 'editor' | 'cards') ?? defaultView;
  return (
    <div className="flex flex-1 flex-col gap-2">
      {view === 'editor' ? <Editor /> : <Cards fileSlug={file} />}
    </div>
  );
}
