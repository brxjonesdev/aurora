import React from 'react';
import { ManuscriptSidebarFileTree } from './manuscript-sidebar';
import { createServices } from '@/lib/aurora/core/createServices';
import type { ManuscriptDBNode } from '@/lib/aurora/core/types/manuscript';

type Props = { manuscriptID: string };

export default async function ManuscriptSidebarLoader({ manuscriptID }: Props) {
  const { manuscriptService } = createServices();
  const result = await manuscriptService.getManuscriptTreeNodes(manuscriptID);

  if (!result.ok) {
    return <div>Error loading manuscript sidebar: {result.error}</div>;
  }

  const nodes: ManuscriptDBNode[] = result.data;
  const rootNodeID = nodes.find(n => n.parent_id === null)?.id ?? null;

  return <ManuscriptSidebarFileTree nodes={nodes} rootNodeID={rootNodeID} manuscriptID={manuscriptID} />;
}
