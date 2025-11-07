import React from 'react';
import { AppSidebar } from './sidebar';

export default async function ManuscriptSidebar({ manuscriptID }: { manuscriptID: string }) {
  // const result = await manuscriptService.getManuscriptTree(manuscriptID);
  {
    /* 
      if (result.ok) {
        const rawFiles = result.data;
        // Convert to tree structure
        const tree = buildSidebarTree(rawFiles);
        // Save to global state
        manuscriptSidebarStore.setState({ tree });
      }
      */
  }
  // 2. convert the files into a tree structure
  // 3. Save it to the global state
  // 4. Render the sidebar with the tree structure
  return <AppSidebar />;
}
