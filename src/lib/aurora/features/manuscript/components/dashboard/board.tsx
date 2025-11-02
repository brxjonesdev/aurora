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
 
  return (
    <Card className="flex-1">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      </CardContent>
    </Card>
  )
}
