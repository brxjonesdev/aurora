"use client";
import { SidebarContent, SidebarFooter, Sidebar } from "@/lib/shared/components/ui/sidebar";
import { useParams } from 'next/navigation'
import Header from "./header";
import ViewSelect from "./view-select";
import ThreadSelect from "./thread-select";
import UserMenu from "@/lib/shared/components/navbar-components/user-menu";

export function AppSidebar() {
  const params = useParams<{
    user: string;
    slug: string;
    view: string;
  }>();

  if (!params?.user || !params?.slug) {
    return null;
  }
  return (
    <Sidebar className="w-64" >
     <Header user={params.user} slug={params.slug}/>
      <SidebarContent>
        <ViewSelect/>
        <ThreadSelect/>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}