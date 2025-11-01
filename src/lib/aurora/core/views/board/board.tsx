import React from 'react';
import BoardToolbar from './toolbar';

export default function BoardView({ user, slug }: { user: string; slug: string }) {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <BoardToolbar />
    </section>
  );
}
