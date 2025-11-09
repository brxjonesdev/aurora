import React from 'react';
import { ManuscriptSidebarFileTree } from './manuscript-sidebar';
import { ManuscriptDBNode } from '../../../types/manuscript';
import { createServices } from '../../../services/createServices';


type Props = { manuscriptID: string };

export default async function ManuscriptSidebarLoader({ manuscriptID }: Props) {
  const { manuscriptService } = createServices();
  const result = await manuscriptService.getManuscriptTreeNodes(manuscriptID);

  if (!result.ok) {
    return <div>Error loading manuscript sidebar: {result.error}</div>;
  }

  const nodes: ManuscriptDBNode[] = result.data;
  

  return <ManuscriptSidebarFileTree nodes={nodes} manuscriptID={manuscriptID} />;
}
