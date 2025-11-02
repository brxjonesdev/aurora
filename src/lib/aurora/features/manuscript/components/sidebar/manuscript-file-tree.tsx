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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/lib/shared/components/ui/dropdown-menu"
import { PlusCircleIcon, PlusIcon } from "lucide-react"

interface File {
  type: "file"
  name: string
  id: string
  slug: string
  hoverSynopsis?: string
}

interface Folder {
  id: string
  type: "folder"
  name: string
  children: Array<Folder | File>
  hoverSynopsis?: string
}

const fakeData: Array<Folder | File> = [
  {
    id: "1",
    type: "folder",
    name: "Chapter 1",
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
  },
]

export default function StoryOrganizer() {
  const [manuscriptData, setManuscriptData] = useState<Array<Folder | File>>([])

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

  // available ids of folders to be used for something
  const availableFolderIds: { id: string; name: string }[] = []
  for (const item of manuscriptData) {
    if (item.type === "folder") {
      availableFolderIds.push({ id: item.id, name: item.name })
    }
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
              key={index}
              item={item}
              itemPath={[index]}
              onUpdate={updateItem}
              onDelete={deleteItem}
              onAddFile={addNewFile}
              onAddFolder={addNewFolder}
              availableFolderDestinations={availableFolderIds}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
