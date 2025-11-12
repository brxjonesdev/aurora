import type { ManuscriptDBNode, ManuscriptTreeNode } from '../../../types/manuscript';
import { buildFileTree } from './utils';

export interface UseManuscriptFileSystemResult {
  fileTree: ManuscriptTreeNode[];
  addNode: (parentID: string | null, name: string, type: 'file' | 'folder') => void;
  renameNode: (nodeID: string, newName: string) => void;
  deleteNode: (nodeID: string) => void;
  duplicateNode: (node: ManuscriptTreeNode) => void;
}

export const useManuscriptFileSystem = (
  manuscriptID: string,
  nodes: ManuscriptDBNode[],
): UseManuscriptFileSystemResult => {
  const fileTree = buildFileTree(nodes);

  const addNode = (parentID: string | null, name: string, type: 'file' | 'folder') => {
    // TODO: add new node to tree + DB
  };

  const renameNode = (nodeID: string, newName: string) => {
    // TODO: rename node in tree + DB
  };

  const deleteNode = (nodeID: string) => {
    // TODO: remove node from tree + DB
  };

  const duplicateNode = (node: ManuscriptTreeNode) => {
    // TODO: clone node (and children if folder) + DB insert
  };

  return {
    fileTree,
    addNode,
    renameNode,
    deleteNode,
    duplicateNode,
  };
};
