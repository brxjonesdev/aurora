'use client';

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/lib/shared/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/shared/components/ui/dropdown-menu';
import { PlusCircleIcon, PlusIcon } from 'lucide-react';

export default function EmptyFileTree({manuscriptID} : {manuscriptID: string}) {
  const handleAddFolder = () => {
    console.log('Add new folder to empty manuscript');
  };

  const handleAddFile = () => {
    console.log('Add new file to empty manuscript');
  };

  return (
    <SidebarGroup className='px-0'>
      <SidebarGroupLabel>Manuscript</SidebarGroupLabel>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarGroupAction>
            <PlusCircleIcon />
          </SidebarGroupAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="center" sideOffset={18}>
          <DropdownMenuItem onClick={handleAddFolder}>
            <PlusIcon className="size-4" />
            <span>Add New Folder</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAddFile}>
            <PlusIcon className="size-4" />
            <span>Add New File</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SidebarGroupContent>
        <div className="px-4 py-2 text-sm text-muted-foreground">
          This manuscript has no folders or files yet.
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
