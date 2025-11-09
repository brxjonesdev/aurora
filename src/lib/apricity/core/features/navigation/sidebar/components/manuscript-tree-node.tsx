"use client"

import type { ManuscriptTreeNode } from "@/lib/apricity/core/types/manuscript"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/lib/shared/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function ManuscriptTreeNodeItem({
  node,
  manuscriptID,
  depth = 0,
}: {
  node: ManuscriptTreeNode
  manuscriptID: string
  depth?: number
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const isFile = node.type === "file"
  const hasChildren = !isFile && node.children.length > 0

  return (
    <SidebarMenuItem key={node.id}>
      <SidebarMenuButton
        asChild={isFile}
        className={cn(
          "flex items-center gap-2 truncate rounded-md transition-all duration-200",
          "hover:bg-sidebar-accent",
          isFile && "text-sidebar-foreground/80 hover:text-sidebar-foreground",
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFile ? (
          <Link href={`/apricity/${manuscriptID}/${node.slug}`} className="flex items-center gap-2 w-full">
            <File className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate text-sm">{node.name}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2 w-full">
            {/* Toggle expand when clicking the icon */}
            {hasChildren && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0.5 rounded hover:bg-sidebar-accent/50 transition"
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isExpanded && "rotate-90",
                  )}
                />
              </button>
            )}

            {/* Folder opens the folder route */}
            <Link
              href={`/apricity/${manuscriptID}/${node.slug}`}
              className="flex items-center gap-2 flex-1 overflow-hidden"
            >
              {isExpanded && hasChildren ? (
                <FolderOpen className="h-4 w-4 shrink-0 text-cyan-400/50" />
              ) : (
                <Folder className="h-4 w-4 shrink-0 text-cyan-400/50" />
              )}
              <span className="truncate text-sm font-medium">{node.name}</span>
            </Link>
          </div>
        )}
      </SidebarMenuButton>

      {hasChildren && isExpanded && (
        <SidebarMenu>
          {node.children.map((child) => (
            <ManuscriptTreeNodeItem key={child.id} node={child} manuscriptID={manuscriptID} depth={depth + 1} />
          ))}
        </SidebarMenu>
      )}
    </SidebarMenuItem>
  )
}
