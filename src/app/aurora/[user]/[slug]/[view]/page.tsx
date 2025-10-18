import React from "react"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"

// Lazy-load large views for performance
const PlotsView = dynamic(() => import("@/lib/aurora/core/stories/views/plot/plots"))
const TimelineView = dynamic(() => import("@/lib/aurora/core/stories/views/timeline/timeline"))
const ThreadsView = dynamic(() => import("@/lib/aurora/core/stories/views/threads/threads"))

export default async function Page({
  params,
}: {
  params: Promise<{ user: string; slug: string; view: string }>
}) {
  const { user, slug, view } = await params

  // promise all for data fetching if needed in the future

  const viewMap: Record<string, React.ReactNode> = {
    plots: <PlotsView user={user} slug={slug} />,
    timeline: <TimelineView user={user} slug={slug} />,
    threads: <ThreadsView user={user} slug={slug} />,
  }

  const selectedView = viewMap[view]

  if (!selectedView) return notFound()

  return (
    <section className="flex w-full flex-1 gap-0 px-8 py-4 justify-center items-center">
      {selectedView}
    </section>
  )
}
