import ManuscriptSidebar from '@/lib/aurora/features/navigation/sidebar/manuscript-sidebar-loader';
import { SidebarInset, SidebarTrigger } from '@/lib/shared/components/ui/sidebar';
import React from 'react';

export default async function AuroraLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string; manuscriptID: string; file: string }>;
}) {
  const { manuscriptID } = await params;

  return (
    <>
      <ManuscriptSidebar manuscriptID={manuscriptID} />
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
