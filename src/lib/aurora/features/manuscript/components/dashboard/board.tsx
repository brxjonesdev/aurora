"use client"
import { Card, CardContent } from "@/lib/shared/components/ui/card"
import SynopsisCard from "./synopsis-card"
import type { Folder, File, Manuscript } from "@/lib/aurora/core/types/manuscript"

export type SynopsisCardProps = {
  id: string
  title: string
  synopsis: string
}

const fakeData: Manuscript = {
  id: "1",
  storyId: "story-1",
  content: [
    {
      id: "1",
      type: "folder",
      slug: "chapter-1",
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
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalWordCount: 0,
  totalCharacterCount: 0,
}

export default function Cards({ fileSlug }: { fileSlug?: string }) {
  // Find a folder by slug and return its child files, or the item itself if it's a file
  const findContentBySlug = (items: (Folder | File)[], slug?: string): (Folder | File)[] => {
    if (!slug) return items

    for (const item of items) {
      if (item.slug === slug) {
        if (item.type === "folder") {
          // Return the folder's children if it's a folder
          return item.children ?? []
        } else {
          // Return the single file if it's a file
          return [item]
        }
      } else if (item.type === "folder" && item.children) {
        const found = findContentBySlug(item.children, slug)
        if (found.length > 0) return found
      }
    }

    return []
  }

  const filteredContent = findContentBySlug(fakeData.content, fileSlug)
  console.log("Filtered Content:", filteredContent)

  const sampleCardData: SynopsisCardProps[] = filteredContent.map((item) => ({
    id: item.id,
    title: item.name,
    synopsis: item.hoverSynopsis || "No synopsis available",
  }))

  return (
    <Card className="flex-1">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleCardData.length > 0 ? (
          sampleCardData.map((card) => <SynopsisCard key={card.id} {...card} />)
        ) : (
          <p className="text-muted-foreground text-sm">No matching files found.</p>
        )}
      </CardContent>
    </Card>
  )
}
