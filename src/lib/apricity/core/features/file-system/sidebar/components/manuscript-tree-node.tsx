"use client"

import type React from "react"

import type { ManuscriptTreeNode } from "@/lib/apricity/core/types/manuscript"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronRight, File, Folder, FolderOpen, MoveIcon } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/lib/shared/components/ui/sidebar"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from "@/lib/shared/components/ui/context-menu"
import { cn } from "@/lib/utils"
import { useDraggable, useDroppable } from "@dnd-kit/core"

export function ManuscriptTreeNodeItem({
  node,
  manuscriptID,
  depth = 0,
  addChildNode,
  editNode,
  deleteNode,
  duplicateNode,
  moveNode,
  editingNodeID,
  setEditingNodeID,
  allFolders,
}: {
  node: ManuscriptTreeNode
  manuscriptID: string
  depth?: number
  addChildNode: (parentID: string | null, name: string, type: "file" | "folder") => void
  editNode: (nodeID: string, changes: Partial<ManuscriptTreeNode>) => void
  deleteNode: (nodeID: string) => void
  duplicateNode: (node: ManuscriptTreeNode) => void
  moveNode: (nodeID: string, newParentID: string | null) => void
  editingNodeID: string | null
  setEditingNodeID: (nodeID: string | null) => void
  allFolders: ManuscriptTreeNode[]
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const isRenaming = editingNodeID === node.id
  const [editedName, setEditedName] = useState(node.name)
  const inputRef = useRef<HTMLInputElement>(null)

  const isFile = node.type === "file"
  const hasChildren = !isFile && node.children.length > 0

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: node.id,
    data: {
      type: node.type,
      node: node,
    },
  })

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: node.id,
    disabled: isFile, // Only folders can be drop targets
    data: {
      type: node.type,
      node: node,
    },
  })

  const setNodeRef = (element: HTMLElement | null) => {
    setDragRef(element)
    if (!isFile) {
      setDropRef(element)
    }
  }

  useEffect(() => {
    if (isRenaming) {
      setEditedName(node.name)
    }
  }, [isRenaming, node.name])

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isRenaming])

  const handleRename = () => {
    const trimmedName = editedName.trim()
    if (trimmedName && trimmedName !== node.name) {
      editNode(node.id, { name: trimmedName })
    }
    setEditingNodeID(null)
  }

  const handleCancelRename = () => {
    setEditedName(node.name)
    setEditingNodeID(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleRename()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancelRename()
    }
  }

  const getValidMoveDestinations = () => {
    const isDescendant = (parent: ManuscriptTreeNode, childId: string): boolean => {
      if (parent.id === childId) return true
      return parent.children.some((child) => isDescendant(child, childId))
    }

    return allFolders.filter((folder) => !isDescendant(node, folder.id))
  }

  const validDestinations = getValidMoveDestinations()

  return (
    <SidebarMenuItem key={node.id}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <SidebarMenuButton
            asChild
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={cn(
              "flex items-center gap-2 truncate rounded-md transition-all duration-200",
              "hover:bg-sidebar-accent",
              isFile && "text-sidebar-foreground/80 hover:text-sidebar-foreground",
              isRenaming && "bg-sidebar-primary/10 ring-2 ring-sidebar-primary/30",
              isDragging && "opacity-50",
              isOver && !isFile && "bg-sidebar-accent/50 ring-2 ring-sidebar-primary/50",
            )}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
          >
            <div className="flex w-full items-center gap-2">
              {isFile ? (
                isRenaming ? (
                  <div className="flex w-full items-center gap-2 py-1">
                    <File className="text-muted-foreground h-4 w-4 shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 truncate text-sm bg-background/50 px-2 py-1 rounded"
                    />
                  </div>
                ) : (
                  <Link href={`/project/${manuscriptID}/${node.slug}`} className="flex w-full items-center gap-2">
                    <File className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span className="truncate text-sm">{node.name}</span>
                  </Link>
                )
              ) : (
                <>
                  {hasChildren && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setIsExpanded(!isExpanded)}
                      onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
                      className="hover:bg-sidebar-accent/50 rounded p-0.5 transition cursor-pointer"
                    >
                      <ChevronRight
                        className={cn(
                          "text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200",
                          isExpanded && "rotate-90",
                        )}
                      />
                    </div>
                  )}

                  {isRenaming ? (
                    <div className="flex flex-1 items-center gap-2 py-1">
                      {isExpanded && hasChildren ? (
                        <FolderOpen className="h-4 w-4 shrink-0 text-cyan-400/50" />
                      ) : (
                        <Folder className="h-4 w-4 shrink-0 text-cyan-400/50" />
                      )}
                      <input
                        ref={inputRef}
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 truncate text-sm font-medium bg-background/50 px-2 py-1 rounded "
                      />
                    </div>
                  ) : (
                    <Link
                      href={`/project/${manuscriptID}/${node.slug}`}
                      className="flex flex-1 items-center gap-2 overflow-hidden"
                    >
                      {isExpanded && hasChildren ? (
                        <FolderOpen className="h-4 w-4 shrink-0 text-cyan-400/50" />
                      ) : (
                        <Folder className="h-4 w-4 shrink-0 text-cyan-400/50" />
                      )}
                      <span className="truncate text-sm font-medium">{node.name}</span>
                    </Link>
                  )}
                </>
              )}
            </div>
          </SidebarMenuButton>
        </ContextMenuTrigger>

        <ContextMenuContent>
          {isFile ? (
            <>
              <ContextMenuItem onClick={() => setEditingNodeID(node.id)}>Rename</ContextMenuItem>
              <ContextMenuItem onClick={() => duplicateNode(node)}>Duplicate</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <MoveIcon className="mr-2 h-4 w-4" />
                  Move to...
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem onClick={() => moveNode(node.id, null)}>
                    <Folder className="mr-2 h-4 w-4" />
                    Root
                  </ContextMenuItem>
                  {validDestinations.length > 0 && <ContextMenuSeparator />}
                  {validDestinations.map((folder) => (
                    <ContextMenuItem key={folder.id} onClick={() => moveNode(node.id, folder.id)}>
                      <Folder className="mr-2 h-4 w-4 text-cyan-400/50" />
                      {folder.name}
                    </ContextMenuItem>
                  ))}
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive" onClick={() => deleteNode(node.id)}>
                Delete
              </ContextMenuItem>
            </>
          ) : (
            <>
              <ContextMenuItem onClick={() => addChildNode(node.id, "New File", "file")}>New File</ContextMenuItem>
              <ContextMenuItem onClick={() => addChildNode(node.id, "New Folder", "folder")}>
                New Folder
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => setEditingNodeID(node.id)}>Rename</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <MoveIcon className="mr-2 h-4 w-4" />
                  Move to...
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem onClick={() => moveNode(node.id, null)}>
                    <Folder className="mr-2 h-4 w-4" />
                    Root
                  </ContextMenuItem>
                  {validDestinations.length > 0 && <ContextMenuSeparator />}
                  {validDestinations.map((folder) => (
                    <ContextMenuItem key={folder.id} onClick={() => moveNode(node.id, folder.id)}>
                      <Folder className="mr-2 h-4 w-4 text-cyan-400/50" />
                      {folder.name}
                    </ContextMenuItem>
                  ))}
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive" onClick={() => deleteNode(node.id)}>
                Delete
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>

      {hasChildren && isExpanded && (
        <SidebarMenu>
          {node.children.map((child) => (
            <ManuscriptTreeNodeItem
              key={child.id}
              node={child}
              manuscriptID={manuscriptID}
              depth={depth + 1}
              addChildNode={addChildNode}
              editNode={editNode}
              deleteNode={deleteNode}
              duplicateNode={duplicateNode}
              moveNode={moveNode}
              editingNodeID={editingNodeID}
              setEditingNodeID={setEditingNodeID}
              allFolders={allFolders}
            />
          ))}
        </SidebarMenu>
      )}
    </SidebarMenuItem>
  )
}
