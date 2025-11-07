import { Button } from '@/lib/shared/components/ui/button';
import { LayoutGrid, LayoutList } from 'lucide-react';
import React from 'react';

export default function ViewToggle({
  view,
  onToggle,
}: {
  view: 'editor' | 'cards';
  onToggle: () => void;
}) {
  return (
    <Button variant="outline" size="sm" onClick={onToggle} className="gap-2 bg-transparent">
      {view === 'cards' ? (
        <>
          <LayoutList className="h-4 w-4" />
          Editor
        </>
      ) : (
        <>
          <LayoutGrid className="h-4 w-4" />
          Cards
        </>
      )}
    </Button>
  );
}
