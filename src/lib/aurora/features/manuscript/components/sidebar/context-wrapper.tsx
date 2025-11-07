'use client';

import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/lib/shared/components/ui/context-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/lib/shared/components/ui/hover-card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/lib/shared/components/ui/alert-dialog';
import {
  AlertCircle,
  CheckCircle,
  Circle,
  Clock,
  Copy,
  Edit,
  FolderInput,
  Plus,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import { Input } from '@/lib/shared/components/ui/input';
import LabelSelect from './label-select';
import StatusSelect from './status-select';

let currentHoverSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;

export default function ContextWrapper({
  children,
  name,
  synopsis,
  itemType,
  itemPath,
  item,
  onUpdate,
  onDelete,
  onAddFile,
  onAddFolder,
  onMove,
  onDuplicate,
  allFolders,
}: {
  children: React.ReactNode;
  name?: string;
  synopsis?: string;
  itemType: string;
  itemPath: number[];
  item?: File | Folder;
  onUpdate?: (updates: Folder | File, path: number[]) => void;
  onDelete?: (path: number[]) => void;
  onAddFile?: (path: number[]) => void;
  onAddFolder?: (path: number[]) => void;
  onMove?: (sourcePath: number[], destinationFolderId: string) => void;
  onDuplicate?: (item: Folder | File, path: number[]) => void;
  allFolders?: Array<{ id: string; name: string }>;
}) {
  const [hoverOpen, setHoverOpen] = React.useState(false);
  const [contextOpen, setContextOpen] = React.useState(false);
  const [editingMode, setEditingMode] = React.useState<'rename' | 'synopsis' | null>(null);
  const [editValue, setEditValue] = React.useState(name || '');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (currentHoverSetter === setHoverOpen) currentHoverSetter = null;
    };
  }, []);

  React.useEffect(() => {
    setEditValue(name || '');
  }, [name]);

  const handleRenameSubmit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== name) {
      onUpdate?.({ ...item!, name: trimmed }, itemPath);
    }
    setEditingMode(null);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(false);
    onDelete?.(itemPath);
  };

  const handleAddFileToFolder = () => onAddFile?.(itemPath);
  const handleAddFolderToFolder = () => onAddFolder?.(itemPath);

  const handleDuplicate = (item: Folder | File) => {
    console.log('duplicating item', item, itemPath);
    onDuplicate?.(item, itemPath);
    setContextOpen(false);
  };

  const handleMoveToFolder = (destinationFolderId: string) => {
    onMove?.(itemPath, destinationFolderId);
    setContextOpen(false);
  };

  const Menu = () => (
    <ContextMenuContent sticky="always" className="w-64 border-2 border-blue-300/70">
      <div className="text-foreground px-2 py-1.5 text-sm font-semibold">{name}</div>
      <ContextMenuSeparator />

      <ContextMenuItem onClick={() => setEditingMode('rename')}>
        <Edit className="mr-2 h-4 w-4" />
        Rename
      </ContextMenuItem>

      <ContextMenuItem
        className="text-destructive focus:text-destructive"
        onClick={() => setDeleteDialogOpen(true)}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </ContextMenuItem>

      <ContextMenuSeparator />

      <LabelSelect selectedLabels={item && 'labels' in item ? item.labels || [] : []} />

      <StatusSelect selectedStatus={item && 'status' in item ? item.status || null : null} />

      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <FolderInput className="mr-2 h-4 w-4" />
          Move to Folder
        </ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          {allFolders && allFolders.length > 0 ? (
            allFolders.map((folder) => (
              <ContextMenuItem key={folder.id} onClick={() => handleMoveToFolder(folder.id)}>
                {folder.name}
              </ContextMenuItem>
            ))
          ) : (
            <div className="text-muted-foreground px-2 py-1.5 text-xs">No folders available</div>
          )}
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSeparator />

      <ContextMenuItem onClick={() => item && handleDuplicate(item)}>
        <Copy className="mr-2 h-4 w-4" />
        Duplicate
      </ContextMenuItem>

      {itemType === 'folder' && item?.type === 'folder' && (
        <>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleAddFileToFolder}>
            <Plus className="mr-2 h-4 w-4" />
            Add File
          </ContextMenuItem>
          <ContextMenuItem onClick={handleAddFolderToFolder}>
            <Plus className="mr-2 h-4 w-4" />
            Add Folder
          </ContextMenuItem>
        </>
      )}
    </ContextMenuContent>
  );

  if (editingMode === 'rename') {
    return (
      <div className="flex items-center gap-2 rounded px-2 py-1">
        <Input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRenameSubmit();
            if (e.key === 'Escape') setEditingMode(null);
          }}
          className="h-6 flex-1 text-xs"
        />
        <button onClick={handleRenameSubmit} className="rounded p-1 hover:bg-blue-200" title="Save">
          <Check className="h-3 w-3 text-green-600" />
        </button>
        <button
          onClick={() => setEditingMode(null)}
          className="rounded p-1 hover:bg-blue-200"
          title="Cancel"
        >
          <X className="h-3 w-3 text-red-600" />
        </button>
      </div>
    );
  }

  return (
    <>
      <ContextMenu onOpenChange={setContextOpen}>
        <ContextMenuTrigger>
          <HoverCard
            openDelay={700}
            open={hoverOpen && !contextOpen}
            onOpenChange={(open) => {
              if (open) {
                if (currentHoverSetter && currentHoverSetter !== setHoverOpen) {
                  currentHoverSetter(false);
                }
                currentHoverSetter = setHoverOpen;
              } else if (currentHoverSetter === setHoverOpen) {
                currentHoverSetter = null;
              }
              if (!contextOpen) setHoverOpen(open);
            }}
          >
            <HoverCardTrigger asChild>{children}</HoverCardTrigger>
            <HoverCardContent
              side="right"
              align="start"
              className="w-60 border-2 border-blue-300/70 bg-blue-300 text-cyan-900"
            >
              <p className="text-sm">
                {synopsis
                  ? synopsis.length > 50
                    ? `${synopsis.substring(0, 50)}...`
                    : synopsis
                  : 'No synopsis available.'}
              </p>
            </HoverCardContent>
          </HoverCard>
        </ContextMenuTrigger>
        <Menu />
      </ContextMenu>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete &quot;{name}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {itemType}.
          </AlertDialogDescription>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
