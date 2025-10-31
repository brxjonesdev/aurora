"use client";
import { SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, Sidebar } from "@/lib/shared/components/ui/sidebar";
import { useParams } from 'next/navigation'
import Header from "./header";
import { View } from "lucide-react";
import ViewSelect from "./view-select";
import ThreadSelect from "./thread-select";

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
     <Header/>
      <SidebarContent>
        <ViewSelect/>
        <ThreadSelect/>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}