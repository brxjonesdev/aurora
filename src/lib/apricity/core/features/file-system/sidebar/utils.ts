// lib/manuscript/build-tree.ts

import { ManuscriptDBNode, ManuscriptTreeNode } from '@/lib/apricity/core/types/manuscript';

export function buildFileTree(nodes: ManuscriptDBNode[]): ManuscriptTreeNode[] {
  const lookup = new Map<string, ManuscriptTreeNode>();

  nodes.forEach((node) => {
    lookup.set(node.id, {
      ...node,
      children: [],
      content: node.type === 'file' ? null : null,
    });
  });

  const roots: ManuscriptTreeNode[] = [];

  nodes.forEach((node) => {
    const treeNode = lookup.get(node.id)!;

    if (node.parent_id === null) {
      roots.push(treeNode);
    } else {
      const parent = lookup.get(node.parent_id);
      parent?.children.push(treeNode);
    }
  });

  return roots;
}
