/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
  SidebarContent,
  SidebarFooter,
  Sidebar,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/lib/shared/components/ui/sidebar';
import UserMenu from '@/lib/shared/components/navbar-components/user-menu';
import React, { use } from 'react';
import ManuscriptFileTree from '../../manuscript/components/sidebar/manuscript-file-tree';
import { ManuscriptDBNode, ManuscriptTreeNode } from '@/lib/aurora/core/types/manuscript';
import EmptyFileTree from '../../manuscript/components/sidebar/empty-file-tree';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/lib/shared/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useApricityStore } from '@/lib/aurora/core/stores/apricity-store';
import SidebarLoading from './loading';


function buildTree(nodes: ManuscriptDBNode[], rootId: string | null): ManuscriptTreeNode | null {
  if (!nodes || nodes.length === 0 || !rootId) return null;

  const lookup = new Map<string, ManuscriptTreeNode>();

  nodes.forEach(node => {
    lookup.set(node.id, { ...node, children: [] });
  });

  nodes.forEach(node => {
    if (node.parent_id) {
      const parent = lookup.get(node.parent_id);
      const child = lookup.get(node.id);
      if (parent && child) parent.children.push(child);
    }
  });

  return lookup.get(rootId) ?? null;
}

export function AppSidebar({ nodes, rootNodeID, manuscriptID }: { nodes: ManuscriptDBNode[], rootNodeID: string | null, manuscriptID: string }) {
  const tree = React.useMemo(() => buildTree(nodes, rootNodeID), [nodes]);
  const setTree = useApricityStore((state) => state.setTree);
  const fileTree = useApricityStore((state) => state.tree);
  React.useEffect(() => {
    if (tree) {
      setTree(tree);
    }
  }, [tree]);


  if (!fileTree){
    return <SidebarLoading />;
  }
  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <p>
          Apricity
        </p>
        <Link href={"/aurora/home"} className="text-sm text-blue-500 hover:underline">
          Back to Home
        </Link>
      
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className='p-0'>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <p className='text-md text-cyan-500 font-bold tracking-wide'>Files</p>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className=''>
          {fileTree ? <ManuscriptFileTree tree={fileTree} manuscriptID={manuscriptID} /> : <EmptyFileTree manuscriptID={manuscriptID} />}
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

