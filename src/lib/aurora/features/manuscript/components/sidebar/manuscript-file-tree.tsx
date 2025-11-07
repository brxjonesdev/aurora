/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/lib/shared/components/ui/sidebar';
import { useEffect, useState } from 'react';
import Tree from './tree';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/shared/components/ui/dropdown-menu';
import { PlusCircleIcon, PlusIcon } from 'lucide-react';
import type { ManuscriptTreeNode } from '@/lib/aurora/core/types/manuscript';
import { useParams, useRouter } from 'next/navigation';

export default function ManuscriptFileTree({tree, manuscriptID} : {tree: ManuscriptTreeNode, manuscriptID: string}) {
const params = useParams<{username: string, manuscriptID: string, fileID: string}>();
const router = useRouter();
const handleSelect = (slug: string, id: string) => {
  if (params.fileID === id) return;
    // router.push(`/aurora/${params.username}/manuscripts/${manuscriptID}/files/${slug}`);
    router.push(`/aurora/${params.username}/${params.manuscriptID}/${id}`);
    // navigate or set state here
  };

  return (
    <SidebarGroup className=''>
      <SidebarGroupLabel className=''>Manuscript</SidebarGroupLabel>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarGroupAction>
            <PlusCircleIcon />
          </SidebarGroupAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="center" sideOffset={18}>
          <DropdownMenuItem >
            <PlusIcon className="size-4" />
            <span>Add New Folder</span>
          </DropdownMenuItem>
          <DropdownMenuItem >
            <PlusIcon className="size-4" />
            <span>Add New File</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SidebarGroupContent>
        <Tree
            item={tree}
            itemPath={[]}
            onSelect={handleSelect}
            selectedId={params.fileID || ''}
          />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
