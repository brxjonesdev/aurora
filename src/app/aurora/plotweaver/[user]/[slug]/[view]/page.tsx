import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import BoardView from '@/lib/aurora/core/views/board/board';

// Lazy-load large views for performance
const TimelineView = dynamic(() => import('@/lib/aurora/core/views/timeline/timeline'));
// const SwimlaneView = dynamic(() => import("@/lib/aurora/core/views/swimlane/swimlane"))
// const BoardView = dynamic(() => import("@/lib/aurora/core/views/board/board"))
// const GraphView = dynamic(() => import("@/lib/aurora/core/views/graph/graph"))
// const AnalyticsView = dynamic(() => import("@/lib/aurora/core/views/analytics/analytics"))

export default async function Page({
  params,
}: {
  params: Promise<{ user: string; slug: string; view: string }>;
}) {
  const { user, slug, view } = await params;

  // promise all for data fetching if needed in the future

  const viewMap: Record<string, React.ReactNode> = {
    timeline: <TimelineView user={user} slug={slug} />,
    swimlane: <div>Swimlane View - Coming Soon</div>, // <SwimlaneView username={user} storySlug={slug} />
    board: <BoardView user={user} slug={slug} />,
    graph: <div>Graph View - Coming Soon</div>, // <GraphView username={user} storySlug={slug} />
    analytics: <div>Analytics View - Coming Soon</div>, // <AnalyticsView username={user} storySlug={slug} />
  };

  const selectedView = viewMap[view];

  if (!selectedView) return notFound();

  return selectedView;
}
