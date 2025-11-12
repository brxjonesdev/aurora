/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/lib/shared/components/ui/sidebar"
import UserMenu from "@/lib/shared/components/navbar-components/user-menu"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/lib/shared/components/ui/collapsible"
import { ChevronDown, PlusSquareIcon } from "lucide-react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/lib/shared/components/ui/context-menu"

import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  useDroppable,
} from "@dnd-kit/core"
import { useState } from "react"
import { File, Folder } from "lucide-react"
import { ManuscriptDBNode } from "../../../types/manuscript"
import { useManuscriptFileSystem } from "./useManuscriptFileSystem"
import { ManuscriptTreeNodeItem } from "./components/manuscript-tree-node"
import BrandHeader from "./components/brand-header"



export function ManuscriptSidebarFileTree({
  nodes,
  manuscriptID,
}: {
  nodes: ManuscriptDBNode[]
  manuscriptID: string
}) {
  const {
    fileTree,
    loading,
    error,
    createNode,
    modifyNode,
    removeNode,
    cloneNode,
    moveNode,
    selectedNodeID,
    setSelectedNodeID,
    getAllFolders,
  } = useManuscriptFileSystem(manuscriptID, nodes)
  const skeletonCount = nodes.length > 0 ? nodes.length : 4

  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const activeNodeId = active.id as string
      const overNodeId = over.id as string

      if (overNodeId === "root") {
        moveNode(activeNodeId, null)
        setActiveId(null)
        return
      }

      // Find the node to determine if we're dropping on a folder or need to use parent
      const findNode = (id: string): any => {
        const search = (nodes: any[]): any => {
          for (const node of nodes) {
            if (node.id === id) return node
            if (node.children) {
              const found = search(node.children)
              if (found) return found
            }
          }
          return null
        }
        return search(fileTree)
      }

      const overNode = findNode(overNodeId)

      // If dropping on a folder, move into it; otherwise move to root
      const newParentID = overNode?.type === "folder" ? overNodeId : null
      moveNode(activeNodeId, newParentID)
    }

    setActiveId(null)
  }

  const getActiveNode = () => {
    if (!activeId) return null
    const search = (nodes: any[]): any => {
      for (const node of nodes) {
        if (node.id === activeId) return node
        if (node.children) {
          const found = search(node.children)
          if (found) return found
        }
      }
      return null
    }
    return search(fileTree)
  }

  const activeNode = getActiveNode()

  const { setNodeRef: setRootDropRef, isOver: isOverRoot } = useDroppable({
    id: "root",
  })

  return (
    <Sidebar className="w-64">
      <BrandHeader id={manuscriptID} />
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <SidebarContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup className="p-0">
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                      <p>Manuscript</p>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>

                  <CollapsibleContent
                    ref={setRootDropRef}
                    className={isOverRoot ? "bg-sidebar-accent/30 rounded-md transition-colors" : ""}
                  >
                    {loading ? (
                      <div className="space-y-2 px-2 py-1">
                        {[...Array(skeletonCount)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-muted h-6.5 w-full animate-pulse rounded-md"
                            style={{ opacity: 0.8 }}
                          />
                        ))}
                      </div>
                    ) : error ? (
                      <p className="px-2 text-xs text-red-500">{error}</p>
                    ) : fileTree.length > 0 ? (
                      <div className="py- min-h-[200px]">
                        {fileTree.map((root) => (
                          <ManuscriptTreeNodeItem
                            key={root.id}
                            node={root}
                            manuscriptID={manuscriptID}
                            addChildNode={createNode}
                            deleteNode={removeNode}
                            duplicateNode={cloneNode}
                            editNode={modifyNode}
                            moveNode={moveNode}
                            editingNodeID={selectedNodeID}
                            setEditingNodeID={setSelectedNodeID}
                            allFolders={getAllFolders()}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground px-2 text-xs">No files yet</p>
                    )}
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>

              <DragOverlay>
                {activeNode ? (
                  <div className="flex items-center gap-2 bg-sidebar-accent px-3 py-2 rounded-md shadow-lg border border-sidebar-border">
                    {activeNode.type === "folder" ? (
                      <Folder className="h-4 w-4 text-cyan-400/50" />
                    ) : (
                      <File className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{activeNode.name}</span>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </SidebarContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => createNode(null, "New File", "file")}>
            <PlusSquareIcon /> Create New File
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => createNode(null, "New Folder", "folder")}>
            <PlusSquareIcon /> Create New Folder
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Sidebar>
  )
}
