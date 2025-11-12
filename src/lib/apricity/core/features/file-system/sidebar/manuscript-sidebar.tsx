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
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/lib/shared/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { ManuscriptDBNode } from '../../../types/manuscript';
import { ManuscriptTreeNodeItem } from './components/manuscript-tree-node';
import { useManuscriptFileSystem } from './useManuscriptFileSystem';

export function ManuscriptSidebarFileTree({
  nodes,
  manuscriptID,
}: {
  nodes: ManuscriptDBNode[];
  manuscriptID: string;
}) {
  const { fileTree, addNode, renameNode, deleteNode, duplicateNode } = useManuscriptFileSystem(manuscriptID, nodes);



  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <p>Apricity</p>
        <Link href="/apricity/home" className="text-sm text-blue-500 hover:underline">
          Back to Home
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <p className="">Manuscript</p>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>

             <CollapsibleContent>
              {fileTree.length > 0 ? (
                fileTree.map(root => (
                  <ManuscriptTreeNodeItem
                    key={root.id}
                    node={root}
                    manuscriptID={manuscriptID}
                  />
                ))
              ) : (
                <p className="text-xs text-muted-foreground px-2">No files yet</p>
              )}
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
