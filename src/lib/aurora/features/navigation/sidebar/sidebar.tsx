'use client';
import {
  SidebarContent,
  SidebarFooter,
  Sidebar,
  SidebarHeader,
} from '@/lib/shared/components/ui/sidebar';
import { useParams, usePathname } from 'next/navigation';
import Header from './header';
import ViewSelect from '../../../core/views/timeline/sidebar/view-select';
import ThreadSelect from '../../../core/views/timeline/sidebar/thread-select';
import UserMenu from '@/lib/shared/components/navbar-components/user-menu';

import React from 'react';
import StoryOrganizer from '../../manuscript/components/sidebar/manuscript-file-tree';

export function AppSidebar() {
  const params = useParams<{ user: string; slug: string; view: string }>();
  const pathname = usePathname();
  const section = pathname.split('/')[2];

  if (!params?.user || !params?.slug) return null;

  const sidebarSections: Record<string, React.ReactNode> = {
    plotweaver: (
      <>
        <ViewSelect />
        <ThreadSelect />
      </>
    ),
    manuscript: <StoryOrganizer user={params.user} story={params.slug} />,
  };

  const sectionContent = sidebarSections[section] ?? null;

  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <Header user={params.user} slug={params.slug} />
      </SidebarHeader>

      <SidebarContent>{sectionContent}</SidebarContent>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
