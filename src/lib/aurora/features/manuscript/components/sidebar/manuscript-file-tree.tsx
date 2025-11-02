/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/lib/shared/components/ui/sidebar"
import { useEffect, useState } from "react"
import Tree from "./tree"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shared/components/ui/dropdown-menu"
import { PlusCircleIcon, PlusIcon } from "lucide-react"
import type { Folder, File } from "@/lib/aurora/core/types/manuscript"
import { usePathname, useRouter } from "next/navigation"

const fakeData: Array<Folder | File> = [
  {
    id: "1",
    type: "folder",
    name: "Chapter 1",
    slug: "chapter-1",
    labels: [{ value: "important", label: "Important", color: "#ef4444" }],
    children: [
      { type: "file", name: "Scene 1.md", id: "4342", slug: "scene-1", hoverSynopsis: "The opening scene" },
      { type: "file", name: "Scene 2.md", id: "232423", slug: "scene-2", hoverSynopsis: "The second scene" },
    ],
    hoverSynopsis: "The first chapter of the story",
  },
  {
    type: "file",
    name: "Introduction.md",
    id: "3",
    slug: "introduction",
    hoverSynopsis: "Introduction to the story",
    status: { value: "in-progress", label: "In Progress", color: "#fbbf24" },
    labels: [{ value: "draft", label: "Draft", color: "#f59e0b" }],
  },
]

export default function StoryOrganizer({ user, story }: { user: string; story: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [manuscriptData, setManuscriptData] = useState<Array<Folder | File>>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    setManuscriptData(fakeData)
  }, [])

  const addNewFolder = (itemPath?: number[]) => {
    setManuscriptData((prevData) => {
      if (!prevData) return [createNewFolder()]

      const newData = JSON.parse(JSON.stringify(prevData))

      if (!itemPath || itemPath.length === 0) {
        newData.push(createNewFolder())
      } else {
        const targetFolder = getItemAtPath(newData, itemPath) as Folder
        if (targetFolder && targetFolder.type === "folder") {
          targetFolder.children.push(createNewFolder())
        }
      }

      return newData
    })
  }

  const addNewFile = (itemPath?: number[]) => {
    setManuscriptData((prevData) => {
      if (!prevData) return [createNewFile()]

      const newData = JSON.parse(JSON.stringify(prevData))

      if (!itemPath || itemPath.length === 0) {
        newData.push(createNewFile())
      } else {
        const targetFolder = getItemAtPath(newData, itemPath) as Folder
        if (targetFolder && targetFolder.type === "folder") {
          targetFolder.children.push(createNewFile())
        }
      }

      return newData
    })
  }

  const getItemAtPath = (data: Array<Folder | File>, path: number[]): Folder | File | null => {
    let current: any = data
    for (const index of path) {
      if (Array.isArray(current)) {
        current = current[index]
      } else if (current.type === "folder") {
        current = current.children[index]
      } else {
        return null
      }
    }
    return current
  }

  const createNewFolder = (): Folder => ({
    id: `${Date.now()}`,
    type: "folder",
    name: `New Folder`,
    children: [],
    slug: `new-folder-${Date.now()}`,
  })

  const createNewFile = (): File => ({
    type: "file",
    name: `New File.md`,
    id: `${Date.now()}`,
    slug: `new-file-${Date.now()}`,
  })

  const updateItem = (updates: Partial<Folder | File>, path: number[]) => {
    setManuscriptData((prevData) => {
      if (!prevData) return prevData

      const newData = JSON.parse(JSON.stringify(prevData))
      let currentLevel: Array<Folder | File> = newData

      for (let i = 0; i < path.length; i++) {
        const index = path[i]
        if (i === path.length - 1) {
          currentLevel[index] = { ...currentLevel[index], ...updates } as Folder | File
        } else if (currentLevel[index].type === "folder") {
          currentLevel = (currentLevel[index] as Folder).children
        } else {
          break
        }
      }

      return newData
    })
  }

  const deleteItem = (path: number[]) => {
    setManuscriptData((prevData) => {
      if (!prevData) return prevData

      const newData = JSON.parse(JSON.stringify(prevData))
      let currentLevel: Array<Folder | File> = newData

      for (let i = 0; i < path.length; i++) {
        const index = path[i]
        if (i === path.length - 1) {
          currentLevel.splice(index, 1)
        } else if (currentLevel[index].type === "folder") {
          currentLevel = (currentLevel[index] as Folder).children
        } else {
          break
        }
      }

      return newData
    })
  }

  const duplicateItem = (item: Folder | File, path: number[]) => {
    console.log("Duplicating item at path:", path, item)
    setManuscriptData((prevData) => {
      if (!prevData) return prevData

      const newData = JSON.parse(JSON.stringify(prevData))
      let currentLevel: Array<Folder | File> = newData

      const cloneWithNewIds = (node: Folder | File): Folder | File => {
        const newId = `${Date.now()}-${Math.random()}`
        if (node.type === "file") {
          return {
            ...node,
            id: newId,
            slug: `duplicate-${newId}`,
            name: node.name.replace(/(\.md)?$/, " Copy$1"),
          }
        } else {
          return {
            ...node,
            id: newId,
            name: `${node.name} Copy`,
            children: node.children.map(cloneWithNewIds),
          }
        }
      }

      for (let i = 0; i < path.length; i++) {
        const index = path[i]
        if (i === path.length - 1) {
          const newItem = cloneWithNewIds(item)
          currentLevel.splice(index + 1, 0, newItem)
        } else if (currentLevel[index].type === "folder") {
          currentLevel = (currentLevel[index] as Folder).children
        } else {
          break
        }
      }

      return newData
    })
  }

  const moveItem = (sourcePath: number[], destinationFolderId: string) => {
    setManuscriptData((prevData) => {
      if (!prevData) return prevData

      const newData = JSON.parse(JSON.stringify(prevData))

      // Helper to locate folder by ID
      const findFolderById = (items: Array<Folder | File>, id: string): Folder | null => {
        for (const item of items) {
          if (item.type === "folder") {
            if (item.id === id) return item
            const found = findFolderById(item.children, id)
            if (found) return found
          }
        }
        return null
      }

      // Get item and remove it from its source
      let sourceLevel: Array<Folder | File> = newData
      for (let i = 0; i < sourcePath.length - 1; i++) {
        const current = sourceLevel[sourcePath[i]]
        if (current.type === "folder") {
          sourceLevel = current.children
        } else {
          return prevData // invalid path
        }
      }

      const [movedItem] = sourceLevel.splice(sourcePath[sourcePath.length - 1], 1)
      if (!movedItem) return prevData

      // Prevent moving a folder into itself or its descendants
      if (movedItem.type === "folder" && movedItem.id === destinationFolderId) return prevData

      // Find destination folder
      const destinationFolder = findFolderById(newData, destinationFolderId)
      if (!destinationFolder) return prevData

      // Prevent circular move (dropping a parent into its child)
      const isDescendant = (folder: Folder, id: string): boolean => {
        return folder.children.some((child) => child.type === "folder" && (child.id === id || isDescendant(child, id)))
      }
      if (
        destinationFolder.type === "folder" &&
        movedItem.type === "folder" &&
        isDescendant(movedItem, destinationFolderId)
      ) {
        return prevData
      }

      // Add to destination
      destinationFolder.children.push(movedItem)

      return newData
    })
  }

  const reorderItem = (sourcePath: number[], targetPath: number[], position: "before" | "after" | "inside") => {
    setManuscriptData((prevData) => {
      if (!prevData) return prevData

      const newData = JSON.parse(JSON.stringify(prevData))

      const getParentPath = (path: number[]) => path.slice(0, -1)
      const getIndex = (path: number[]) => path[path.length - 1]

      // Navigate to source level and remove item
      let sourceLevel: Array<Folder | File> = newData
      for (let i = 0; i < sourcePath.length - 1; i++) {
        const current = sourceLevel[sourcePath[i]]
        if (current.type === "folder") {
          sourceLevel = current.children
        } else {
          return prevData
        }
      }

      const sourceIndex = getIndex(sourcePath)
      const [movedItem] = sourceLevel.splice(sourceIndex, 1)
      if (!movedItem) return prevData

      // Adjust target path if moving within same parent
      const sourceParentPath = getParentPath(sourcePath)
      const targetParentPath = getParentPath(targetPath)
      const sameParent = JSON.stringify(sourceParentPath) === JSON.stringify(targetParentPath)

      const adjustedTargetPath = [...targetPath]
      if (sameParent && sourceIndex < getIndex(targetPath)) {
        adjustedTargetPath[adjustedTargetPath.length - 1] -= 1
      }

      // Navigate to target level
      let targetLevel: Array<Folder | File> = newData
      for (let i = 0; i < adjustedTargetPath.length - 1; i++) {
        const current = targetLevel[adjustedTargetPath[i]]
        if (current.type === "folder") {
          targetLevel = current.children
        } else {
          return prevData
        }
      }

      const targetIndex = getIndex(adjustedTargetPath)
      const insertIndex = position === "before" ? targetIndex : targetIndex + 1

      targetLevel.splice(insertIndex, 0, movedItem)

      return newData
    })
  }

  const getAllFolders = (items: Array<Folder | File>, currentId?: string): Array<{ id: string; name: string }> => {
    const folders: Array<{ id: string; name: string }> = []
    for (const item of items) {
      if (item.type === "folder" && item.id !== currentId) {
        folders.push({ id: item.id, name: item.name })
        folders.push(...getAllFolders(item.children, currentId))
      }
    }
    return folders
  }

  const handleSelect = (targetFileSlug: string, id: string, type: "file" | "folder") => {
    console.log("Selected:", targetFileSlug, id, type)
    setSelectedId(id)
    router.push(
      `/aurora/manuscript/${user}/${story}/${targetFileSlug}/${type === "folder" ? "?view=cards" : "?view=editor"}`,
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Manuscript Files</SidebarGroupLabel>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarGroupAction>
            <PlusCircleIcon />
          </SidebarGroupAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="center" sideOffset={18}>
          <DropdownMenuItem onClick={() => addNewFolder()}>
            <PlusIcon className="size-4" />
            <span>Add New Folder</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addNewFile()}>
            <PlusIcon className="size-4" />
            <span>Add New File</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SidebarGroupContent>
        <SidebarMenu>
          {manuscriptData?.map((item, index) => (
            <Tree
              key={item.id}
              item={item}
              selectedId={selectedId}
              itemPath={[index]}
              onUpdate={updateItem}
              onDelete={deleteItem}
              onAddFile={addNewFile}
              onAddFolder={addNewFolder}
              onDuplicate={duplicateItem}
              onSelect={handleSelect}
              onMove={moveItem}
              onReorder={reorderItem}
              allFolders={getAllFolders(manuscriptData, item.type === "folder" ? item.id : undefined)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
