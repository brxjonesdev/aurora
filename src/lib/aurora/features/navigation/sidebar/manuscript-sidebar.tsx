import React from 'react';
import { AppSidebar } from './sidebar';
import { createServices } from '@/lib/aurora/core/createServices';

export default async function ManuscriptSidebar({ manuscriptID }: { manuscriptID: string }) {
  const {manuscriptService} = createServices();
  const result = await manuscriptService.getManuscriptTreeNodes(manuscriptID);
  if(!result.ok){
    return <div>Error loading manuscript sidebar: {result.error}</div>;
  }
  const nodes = result.data;
  const rootNodeID = nodes.find(n => n.parent_id === null)?.id ?? null;
  return <AppSidebar nodes={nodes} rootNodeID={rootNodeID} manuscriptID={manuscriptID} />;
}
