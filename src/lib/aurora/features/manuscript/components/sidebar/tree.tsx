'use client';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/lib/shared/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/lib/shared/components/ui/collapsible';
import { ChevronRight, FolderIcon, FileIcon } from 'lucide-react';
import ContextWrapper from './context-wrapper';
import type { Folder, File } from '@/lib/aurora/core/types/manuscript';

type TreeItem = Folder | File;

export default function Tree({
  item,
  itemPath = [],
  onUpdate,
  onDelete,
  onAddFile,
  onAddFolder,
  onDuplicate,
  onSelect,
  allFolders,
  selectedId,
}: {
  item: TreeItem;
  itemPath?: number[];
  onUpdate?: (updates: Folder | File, path: number[]) => void;
  onDelete?: (path: number[]) => void;
  onAddFile?: (path: number[]) => void;
  onAddFolder?: (path: number[]) => void;
  onDuplicate?: (item: Folder | File, path: number[]) => void;
  allFolders?: Array<{ id: string; name: string }>;
  selectedId?: string | null;
  onSelect?: (fileID: string) => void;
}) {
  if (item.type === 'file') {
    return (
      <ContextWrapper
        name={item.name}
        synopsis={item.hover_synopsis}
        itemType={item.type}
        itemPath={itemPath}
        item={item}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        allFolders={allFolders}
      >
        <SidebarMenuItem
          className="cursor-pointer rounded"
          onClick={() => onSelect?.(item.id)}
        >
          <SidebarMenuButton
            className={`rounded text-xs ${
              selectedId === item.id
                ? 'bg-blue-300/30 hover:bg-blue-300/30'
                : 'bg-transparent hover:bg-cyan-300/30'
            } focus-visible:ring-0 focus-visible:ring-offset-0`}
          >
            <FileIcon className="size-4" />
            {item.name}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </ContextWrapper>
    );
  }

  return (
    <ContextWrapper
      name={item.name}
      synopsis={item.hover_synopsis}
      itemType={item.type}
      itemPath={itemPath}
      item={item}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onAddFile={onAddFile}
      onAddFolder={onAddFolder}
      onDuplicate={onDuplicate}
      allFolders={allFolders}
    >
      <SidebarMenuItem>
        <Collapsible
          className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
          defaultOpen={false}
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={`rounded text-xs ${
                selectedId === item.id
                  ? 'bg-blue-300/30 hover:bg-blue-300/30'
                  : 'bg-transparent hover:bg-cyan-300/30'
              } focus-visible:ring-0 focus-visible:ring-offset-0`}
              onClick={() => onSelect?.(item.id)}
            >
              <ChevronRight className="size-4 transition-transform" />
              <FolderIcon className="size-4" />
              {item.name}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((child, index) => (
                <Tree
                  key={child.id}
                  item={child}
                  itemPath={[...itemPath, index]}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onAddFile={onAddFile}
                  onAddFolder={onAddFolder}
                  onDuplicate={onDuplicate}
                  onSelect={onSelect}
                  allFolders={allFolders}
                  selectedId={selectedId}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    </ContextWrapper>
  );
}
