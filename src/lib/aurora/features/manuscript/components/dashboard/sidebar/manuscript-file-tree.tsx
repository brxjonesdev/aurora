"use client"

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/lib/shared/components/ui/sidebar"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shared/components/ui/dropdown-menu"
import { PlusCircleIcon, PlusIcon } from "lucide-react"
import Tree from "../../sidebar/tree"

export type Folder = {
  id: string
  type: "folder"
  name: string
  children: Array<Folder | File>
  hoverSynopsis?: string
}

export type File = {
  type: "file"
  name: string
  id: string
  slug: string
  hoverSynopsis?: string
}

const testdata: Array<Folder | File> = [
  {
    id: "1",
    type: "folder",
    name: "Chapter 1",
    children: [
      { type: "file", name: "Scene 1.md", id: "1", slug: "scene-1", hoverSynopsis: "The opening scene" },
      { type: "file", name: "Scene 2.md", id: "2", slug: "scene-2", hoverSynopsis: "The second scene" },
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
  const [manuscriptData, setManuscriptData] = useState<Array<Folder | File> | null>(testdata)

  const addNewFolder = () => {
    const newFolder: Folder = {
      id: `${Date.now()}`,
      type: "folder",
      name: `New Folder ${manuscriptData ? manuscriptData.length + 1 : 1}`,
      children: [],
    }
    setManuscriptData((prevData) => (prevData ? [...prevData, newFolder] : [newFolder]))
  }

  const addNewFile = () => {
    const newFile: File = {
      type: "file",
      name: `New File ${manuscriptData ? manuscriptData.length + 1 : 1}.md`,
      id: `${Date.now()}`,
      slug: `new-file-${Date.now()}`,
    }
    setManuscriptData((prevData) => (prevData ? [...prevData, newFile] : [newFile]))
  }

  const updateItem = (updates: Partial<Folder | File>, path: number[]) => {
    setManuscriptData((prevData) => {
      if (!prevData) return prevData

      const newData = [...prevData]
      let currentLevel: Array<Folder | File> = newData

      for (let i = 0; i < path.length; i++) {
        const index = path[i]
        if (i === path.length - 1) {
          const currentItem = currentLevel[index]
          if (currentItem.type === "folder") {
            currentLevel[index] = { ...currentItem, ...updates } as Folder
          } else {
            currentLevel[index] = { ...currentItem, ...updates } as File
          }
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

      const newData = [...prevData]
      let currentLevel: Array<Folder | File> = newData

      for (let i = 0; i < path.length; i++) {
        const index = path[i]
        if (i === path.length - 1) {
          currentLevel.splice(index, 1)
        } else if (currentLevel[index].type === "folder") {
          const folder = currentLevel[index] as Folder
          currentLevel[index] = { ...folder, children: [...folder.children] }
          currentLevel = (currentLevel[index] as Folder).children
        } else {
          break
        }
      }

      return newData
    })
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
          <DropdownMenuItem onClick={addNewFolder}>
            <PlusIcon className="size-4" />
            <span>Add New Folder</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={addNewFile}>
            <PlusIcon className="size-4" />
            <span>Add New File</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SidebarGroupContent>
        <SidebarMenu>
          {manuscriptData?.map((item, index) => (
            <Tree key={index} item={item} itemPath={[index]} onUpdate={updateItem} onDelete={deleteItem} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
