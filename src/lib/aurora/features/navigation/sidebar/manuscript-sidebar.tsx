/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
  SidebarContent,
  SidebarFooter,
  Sidebar,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/lib/shared/components/ui/sidebar';
import UserMenu from '@/lib/shared/components/navbar-components/user-menu';
import React from 'react';
import { ManuscriptDBNode} from '@/lib/aurora/core/types/manuscript';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/lib/shared/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

export function ManuscriptSidebarFileTree({
  nodes,
  rootNodeID,
  manuscriptID,
}: {
  nodes: ManuscriptDBNode[];
  rootNodeID: string | null;
  manuscriptID: string;
}) {
  console.log('Rendering ManuscriptSidebarFileTree with nodes:', nodes, 'and rootNodeID:', rootNodeID);

  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <p>Apricity</p>
        <Link href={'/aurora/home'} className="text-sm text-blue-500 hover:underline">
          Back to Home
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <p className="text-md font-bold tracking-wide text-cyan-500">Files</p>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="">
        
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
