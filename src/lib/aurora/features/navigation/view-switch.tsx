"use client"
import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/shared/components/ui/select"
import { useParams, useRouter } from "next/navigation"

export default function ViewSwitch() {
  const params = useParams<{ story: string; id: string; view: "timeline" | "plots" | "threads" }>()
  const view = params.view.charAt(0).toUpperCase() + params.view.slice(1)
  const router = useRouter()

  React.useEffect(() => {
    if (!params.view) {
      router.replace(`/story/${params.id}/timeline`)
    }
  }, [params.view, params.id, router])

  const handleChange = (value: string) => {
    router.push(`${value}`)
  }
  return (
    <Select onValueChange={handleChange} defaultValue={params.view}>
      <SelectTrigger className="w-fit min-w-[100px] min-h-[44px] text-xs md:text-sm">
        <SelectValue placeholder={view} />
      </SelectTrigger>
      <SelectContent className="max-w-[calc(100vw-2rem)]">
        <SelectItem value="timeline" className="py-3">
          Timeline
        </SelectItem>
        <SelectItem value="plots" className="py-3">
          Plots
        </SelectItem>
        <SelectItem value="threads" className="py-3">
          Threads
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
