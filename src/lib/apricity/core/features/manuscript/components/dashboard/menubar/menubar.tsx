'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import ViewToggle from './view-toggle';

export default function ManuscriptMenubar({ fileName }: { fileName: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = (searchParams.get('view') as 'editor' | 'cards') ?? 'editor';

  const handleViewToggle = () => {
    const nextView = view === 'cards' ? 'editor' : 'cards';
    const params = new URLSearchParams(searchParams);
    params.set('view', nextView);
    router.replace(`?${params.toString()}`);
  };

  const formattedFileName = fileName
    ? fileName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'Untitled Document';

  return (
    <div className="mb-2 flex items-center gap-4 border-b pb-2">
      <ViewToggle view={view} onToggle={handleViewToggle} />

      {/* Filename Display */}
      <div className="flex h-full flex-1 items-center justify-center truncate rounded-lg bg-blue-300/10 text-sm font-medium text-blue-300/70">
        {formattedFileName}
      </div>
    </div>
  );
}
