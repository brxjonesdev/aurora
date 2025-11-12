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
import { ChevronDown } from "lucide-react"

import { useManuscriptFileSystem } from "./useManuscriptFileSystem"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/lib/shared/components/ui/context-menu"
import { ManuscriptDBNode } from "../../../types/manuscript"
import { ManuscriptTreeNodeItem } from "./components/manuscript-tree-node"

export function ManuscriptSidebarFileTree({
  nodes,
  manuscriptID,
}: {
  nodes: ManuscriptDBNode[]
  manuscriptID: string
}) {
  const { fileTree, loading, error } = useManuscriptFileSystem(manuscriptID, nodes)
  const skeletonCount = nodes.length > 0 ? nodes.length : 4

  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <p>Apricity</p>
        <Link href="/apricity/home" className="text-sm text-blue-500 hover:underline">
          Back to Home
        </Link>
      </SidebarHeader>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <SidebarContent>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroup className="p-0">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    <p>Manuscript</p>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  {loading ? (
                    <div className="space-y-2 px-2 py-1">
                      {[...Array(skeletonCount)].map((_, i) => (
                        <div
                          key={i}
                          className="h-6.5 w-full bg-muted rounded-md animate-pulse"
                          style={{ opacity: 0.8 }}
                        />
                      ))}
                    </div>
                  ) : error ? (
                    <p className="text-xs text-red-500 px-2">{error}</p>
                  ) : fileTree.length > 0 ? (
                    fileTree.map((root) => (
                      <ManuscriptTreeNodeItem key={root.id} node={root} manuscriptID={manuscriptID} />
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground px-2">No files yet</p>
                  )}
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          </SidebarContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled>Create New File</ContextMenuItem>
          <ContextMenuItem disabled>Create New Folder</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem disabled>Expand All</ContextMenuItem>
          <ContextMenuItem disabled>Collapse All</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem disabled>Refresh</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
