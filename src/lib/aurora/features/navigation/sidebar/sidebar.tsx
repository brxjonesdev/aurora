'use client';
import {
  SidebarContent,
  SidebarFooter,
  Sidebar,
  SidebarHeader,
} from '@/lib/shared/components/ui/sidebar';
import { useParams} from 'next/navigation';
import Header from './header';
import UserMenu from '@/lib/shared/components/navbar-components/user-menu';
import React from 'react';
import ManuscriptFileTree from '../../manuscript/components/sidebar/manuscript-file-tree';

export function AppSidebar() {
  const params = useParams<{ username: string; slug: string; view: string }>();
  if (!params?.username || !params?.slug) return null;


  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <Header user={params.username} slug={params.slug} />
      </SidebarHeader>

      <SidebarContent>
        <ManuscriptFileTree user={params.username} story={params.slug} />
      </SidebarContent>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
