"use client"
import { usePathname, useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/shared/components/ui/select"
import type { Story } from "../../core/stories/types"

export interface StoryMenuItem {
  id: number
  name: string
  slug: string
}

interface StorySwitchProps {
  stories: Story[]
  selectedStory: string
}

export default function StorySwitch({ stories, selectedStory }: StorySwitchProps) {
  const pathname = usePathname()
  const router = useRouter()
  console.log("Pathname:", pathname)
  console.log("Selected Story:", selectedStory)
  console.log("Stories:", stories)
  if (pathname === "/aurora/home") {
    return <p>Home</p>
  }

  const selected = stories.find((story) => story.slug.toString() === selectedStory)

  // Extract the current subpage (e.g. timeline, overview, etc.)
  const currentSubpage = pathname.split("/").pop() || "timeline"

  const handleChange = (slug: string) => {
    const story = stories.find((s) => s.slug === slug)
    if (story) {
      router.push(`/aurora/${story.slug}/${story.id}/${currentSubpage}`)
    }
  }

  return (
    <Select defaultValue={selected?.slug} onValueChange={handleChange}>
      <SelectTrigger className="w-fit min-w-[120px] min-h-[44px] text-xs md:text-sm">
        <SelectValue placeholder={selected?.title || "Select story"} className="text-xs md:text-sm" />
      </SelectTrigger>
      <SelectContent className="max-w-[calc(100vw-2rem)]">
        {stories.map((story) => (
          <SelectItem key={story.id} value={story.slug} className="text-xs md:text-sm py-3">
            {story.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
