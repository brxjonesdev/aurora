import { AppSidebar } from '@/lib/aurora/features/navigation/sidebar/sidebar';
import React from 'react';

export default function AuroraLayout({ children }: { children: React.ReactNode }) {
  return (<>
    <AppSidebar/>
    <main className="flex min-h-screen flex-col  w-full">
      {children}
    </main>
  </>);
}
