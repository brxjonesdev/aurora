import Navbar from '@/lib/aurora/features/navigation/navbar';
import React from 'react';

export default function AuroraLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="flex w-full items-center gap-4 px-4  border-b">
        <Navbar />
      </section>
      {children}
    </main>
  );
}
