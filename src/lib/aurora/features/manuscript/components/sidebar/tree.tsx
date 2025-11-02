"use client"
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/lib/shared/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/lib/shared/components/ui/collapsible"
import { ChevronRight, FolderIcon, FileIcon } from "lucide-react"
import ContextWrapper from "./context-wrapper"
import { Folder, File } from "@/lib/aurora/core/types/manuscript"

type TreeItem = Folder | File

export default function Tree({
  item,
  itemPath = [],
  onUpdate,
  onDelete,
  onAddFile,
  onAddFolder,
  onDuplicate,
  onMove,
  allFolders,
  selectedId,
}: {
  item: TreeItem
  itemPath?: number[]
  onUpdate?: (updates: Folder | File, path: number[]) => void
  onDelete?: (path: number[]) => void
  onAddFile?: (path: number[]) => void
  onAddFolder?: (path: number[]) => void
  onDuplicate?: (item: Folder | File, path: number[]) => void
  onMove?: (sourcePath: number[], destinationFolderId: string) => void
  allFolders?: Array<{ id: string; name: string }>
  selectedId?: string | null
}) {

  if (item.type === "file") {
    return (
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
          className={`cursor-pointer ${
            selectedId === item.id ? "bg-accent/50" : "hover:bg-accent/20"
          }`}
        >
          <SidebarMenuButton
            className="text-xs data-[active=true]:bg-transparent"
          >
            <FileIcon className="size-4" />
            {item.name}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </ContextWrapper>
    )
  }


  return (
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
              className={`text-xs ${
                selectedId === item.id ? "bg-accent/50" : "hover:bg-accent/20"
              }`}
            >
              <ChevronRight className="transition-transform size-4" />
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
                  onAddFile={onAddFile}
                  onAddFolder={onAddFolder}
                  onDuplicate={onDuplicate}
                  allFolders={allFolders}
                  selectedId={selectedId}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    </ContextWrapper>
  )
}
