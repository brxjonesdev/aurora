'use client';
import { SidebarContent, SidebarFooter, Sidebar } from '@/lib/shared/components/ui/sidebar';
import { useParams } from 'next/navigation';
import Header from './header';
import ViewSelect from '../../../core/views/timeline/sidebar/view-select';
import ThreadSelect from '../../../core/views/timeline/sidebar/thread-select';
import UserMenu from '@/lib/shared/components/navbar-components/user-menu';
import { usePathname } from 'next/navigation';
import StoryOrganizer from '../../manuscript/components/sidebar/story-organizer';

export function AppSidebar() {
  const params = useParams<{
    user: string;
    slug: string;
    view: string;
  }>();

  const pathname = usePathname();
  const view: string = pathname.split('/')[2];

  if (!params?.user || !params?.slug) {
    return null;
  }

  return (
    <Sidebar className="w-64">
      <Header user={params.user} slug={params.slug} />
      <SidebarContent>
        {view === 'plotweaver' ? (
          <>
            <ViewSelect />
            <ThreadSelect />
          </>
        ) : null}
        {view === 'manuscript' ? (
          <>
          <StoryOrganizer/>
          </>
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
