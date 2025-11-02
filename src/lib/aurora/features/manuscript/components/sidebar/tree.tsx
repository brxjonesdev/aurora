'use client';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/lib/shared/components/ui/sidebar';
import type React from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/lib/shared/components/ui/collapsible';
import { ChevronRight, FolderIcon, FileIcon } from 'lucide-react';
import ContextWrapper from './context-wrapper';
import type { Folder, File } from '@/lib/aurora/core/types/manuscript';
import { useState } from 'react';

type TreeItem = Folder | File;

export default function Tree({
  item,
  itemPath = [],
  onUpdate,
  onDelete,
  onAddFile,
  onAddFolder,
  onDuplicate,
  onMove,
  onReorder,
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
  onMove?: (sourcePath: number[], destinationFolderId: string) => void;
  onReorder?: (
    sourcePath: number[],
    targetPath: number[],
    position: 'before' | 'after' | 'inside'
  ) => void;
  allFolders?: Array<{ id: string; name: string }>;
  selectedId?: string | null;
  onSelect?: (targetFileSlug: string, id: string, type: 'file' | 'folder') => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState<'before' | 'after' | 'inside' | null>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        itemPath,
        itemId: item.id,
        itemType: item.type,
      })
    );
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(false);
    setDragOver(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;

    // Determine drop position based on cursor location
    if (item.type === 'folder') {
      if (y < height * 0.25) {
        setDragOver('before');
      } else if (y > height * 0.75) {
        setDragOver('after');
      } else {
        setDragOver('inside');
      }
    } else {
      // Files can only be reordered before/after
      if (y < height * 0.5) {
        setDragOver('before');
      } else {
        setDragOver('after');
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    // Only clear if we're leaving the element entirely
    if (e.currentTarget === e.target) {
      setDragOver(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const sourcePath = data.itemPath as number[];

      // Prevent dropping on itself
      if (JSON.stringify(sourcePath) === JSON.stringify(itemPath)) {
        setDragOver(null);
        return;
      }

      // Handle drop based on position
      if (dragOver === 'inside' && item.type === 'folder') {
        onMove?.(sourcePath, item.id);
      } else if (dragOver === 'before' || dragOver === 'after') {
        onReorder?.(sourcePath, itemPath, dragOver);
      }
    } catch (error) {
      console.error('Drop error:', error);
    }

    setDragOver(null);
  };

  if (item.type === 'file') {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative ${isDragging ? 'opacity-50' : ''}`}
      >
        {dragOver === 'before' && (
          <div className="absolute top-0 right-0 left-0 z-10 h-0.5 bg-blue-500" />
        )}
        {dragOver === 'after' && (
          <div className="absolute right-0 bottom-0 left-0 z-10 h-0.5 bg-blue-500" />
        )}

        <ContextWrapper
          name={item.name}
          synopsis={item.hoverSynopsis}
          itemType={item.type}
          itemPath={itemPath}
          item={item}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onMove={onMove}
          onDuplicate={onDuplicate}
          allFolders={allFolders}
        >
          <SidebarMenuItem
            className="cursor-pointer rounded"
            onClick={() => onSelect?.(item.slug, item.id, item.type)}
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
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative ${isDragging ? 'opacity-50' : ''}`}
    >
      {dragOver === 'before' && (
        <div className="absolute top-0 right-0 left-0 z-10 h-0.5 bg-blue-500" />
      )}
      {dragOver === 'after' && (
        <div className="absolute right-0 bottom-0 left-0 z-10 h-0.5 bg-blue-500" />
      )}
      {dragOver === 'inside' && (
        <div className="pointer-events-none absolute inset-0 z-0 rounded border-2 border-blue-500 bg-blue-500/20" />
      )}

      <ContextWrapper
        name={item.name}
        synopsis={item.hoverSynopsis}
        itemType={item.type}
        itemPath={itemPath}
        item={item}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onAddFile={onAddFile}
        onMove={onMove}
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
                onClick={() => onSelect?.(item.slug, item.id, item.type)}
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
                    onMove={onMove}
                    onReorder={onReorder}
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
    </div>
  );
}
