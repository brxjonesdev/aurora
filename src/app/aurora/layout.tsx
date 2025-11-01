import { AppSidebar } from '@/lib/aurora/features/navigation/sidebar/sidebar';
import { SidebarInset, SidebarTrigger } from '@/lib/shared/components/ui/sidebar';
import React from 'react';

export default function AuroraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
      <main className="flex min-h-screen w-full flex-col">
        <div className="flex items-center gap-4 border-b p-4 md:hidden">
          <SidebarTrigger />
          <h3 className="text-lg font-semibold">Aurora</h3>
        </div>
        {children}
      </main>
      </SidebarInset>
    </>
  );
}
