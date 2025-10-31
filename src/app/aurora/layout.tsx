import Navbar from '@/lib/aurora/features/navigation/navbar/navbar';
import { AppSidebar } from '@/lib/aurora/features/navigation/sidebar/sidebar';
import { SidebarTrigger } from '@/lib/shared/components/ui/sidebar';
import React from 'react';

export default function AuroraLayout({ children }: { children: React.ReactNode }) {
  return (<>
    <AppSidebar/>
    <main className="flex min-h-screen flex-col  w-full">
      <section className="flex w-full items-center px-4 border-b">
        <Navbar />
      </section>
      {children}
    </main>
  </>);
}
