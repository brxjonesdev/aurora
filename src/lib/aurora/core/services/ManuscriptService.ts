/* eslint-disable @typescript-eslint/no-explicit-any */
import { ok, err, Result } from '@/lib/utils';
import { IManuscriptRepository } from '../repositories/interfaces/IManuscriptRepo';
import { ManuscriptDBNode, ManuscriptTreeNode } from '@/lib/aurora/core/types/manuscript';

export default function createManuscriptService(repository: IManuscriptRepository) {

  function buildTree(nodes: ManuscriptDBNode[]): ManuscriptTreeNode {
    const lookup = new Map<string, ManuscriptTreeNode>();

    // Convert DB nodes into tree nodes (but without children linked yet)
    nodes.forEach(node => {
      lookup.set(node.id, {
        ...node,
        children: []
      });
    });

    let root: ManuscriptTreeNode | null = null;

    nodes.forEach(node => {
      const treeNode = lookup.get(node.id)!;

      if (node.parentId) {
        const parent = lookup.get(node.parentId);
        if (parent) {
          parent.children.push(treeNode);
        }
      } else {
        root = treeNode;
      }
    });

    if (!root) {
      throw new Error('Root node not found');
    }

    return root;
  }

  return {
    async getManuscriptTree(manuscriptId: string): Promise<Result<ManuscriptTreeNode, string>> {
      const result = await repository.getManuscriptNodes(manuscriptId);

      if (!result.ok) {
        return err(result.error);
      }

      try {
        const tree = buildTree(result.data);
        return ok(tree);
      } catch (e: any) {
        return err(e.message);
      }
    },
  };
}
