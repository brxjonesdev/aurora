"use client"

import { Card, CardContent } from "@/lib/shared/components/ui/card"
import SynopsisCard from "./synopsis-card"
import type { Folder, File} from "@/lib/aurora/core/types/manuscript"

export type SynopsisCardProps = {
  id: string
  title: string
  synopsis: string
}

// Recursive search function
function findItemBySlug(items: (Folder | File)[], slug: string): Folder | File | undefined {
  for (const item of items) {
    if (item.slug === slug) return item
    if (item.type === "folder" && item.children) {
      const found = findItemBySlug(item.children, slug)
      if (found) return found
    }
  }
  return undefined
}

export default function Cards({
  fileSlug,
}: {
  fileSlug: string
}) {
  if (!fileSlug)
    return <div className="text-muted-foreground flex h-64 items-center justify-center">Select a document</div>
  
  const manuscript = {
    content: [],
  }

  const file = findItemBySlug(manuscript.content, fileSlug)

  if (!file) {
    return <div className="text-muted-foreground flex h-64 items-center justify-center">File not found</div>
  }

  if (file.type === "file") {
    return <div className="text-muted-foreground flex h-64 items-center justify-center">This file has no sub-docs</div>
  }

  if (!file.children || file.children.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center">This folder has no sub-docs</div>
    )
  }

  return (
    <Card className="flex-1">
      <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {file.children.map((item) => (
          <SynopsisCard
            key={item.id}
            id={item.id}
            title={item.name}
            labels={item.labels}
            status={item.status}
            synopsis={item.hoverSynopsis ?? ""}
          />
        ))}
      </CardContent>
    </Card>
  )
}
