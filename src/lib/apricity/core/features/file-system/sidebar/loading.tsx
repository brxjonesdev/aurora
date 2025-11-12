import {Sidebar , SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarFooter } from "@/lib/shared/components/ui/sidebar";
import { Skeleton } from "@/lib/shared/components/ui/skeleton";

export default function SidebarLoading() {
  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-32" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel>
            <Skeleton className="h-5 w-20" />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-36" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Skeleton className="h-8 w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}
