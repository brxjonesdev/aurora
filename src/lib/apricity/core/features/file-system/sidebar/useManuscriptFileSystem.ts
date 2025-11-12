'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ManuscriptDBNode, ManuscriptTreeNode } from '../../../types/manuscript';
import { buildFileTree } from './utils';
import { useFileSystemStore } from '../../../stores/file-system-provider';

export interface UseManuscriptFileSystemResult {
  fileTree: ManuscriptTreeNode[];
  loading: boolean;
  error: string | null;
  createNode: (parentID: string | null, name: string, type: 'file' | 'folder') => void;
  renameNode: (nodeID: string, newName: string) => void;
  removeNode: (nodeID: string) => void;
  cloneNode: (node: ManuscriptTreeNode) => void;
}

export const useManuscriptFileSystem = (
  manuscriptID: string,
  nodes: ManuscriptDBNode[] | null,
): UseManuscriptFileSystemResult => {
  const {
    tree,
    setTree,
    addNode,
    renameNode,
    deleteNode,
    duplicateNode,
  } = useFileSystemStore((state) => state);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fileTree = useMemo(() => {
    if (!nodes) return [];
    try {
      return buildFileTree(nodes);
    } catch (err) {
      setError('Failed to build file tree.');
      return [];
    }
  }, [nodes]);

  useEffect(() => {
    if (!nodes) {
      setError('No manuscript data found.');
      setLoading(false);
      return;
    }

    // Simulate a short delay for smoother UX (optional)
    const timeout = setTimeout(() => {
      setTree(fileTree);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [fileTree, nodes, setTree]);

  const createNode = (parentID: string | null, name: string, type: 'file' | 'folder') => {
    addNode(parentID, name, type);
  };

  const removeNode = (nodeID: string) => {
    deleteNode(nodeID);
  };

  const cloneNode = (node: ManuscriptTreeNode) => {
    duplicateNode(node);
  };

  return {
    fileTree: tree,
    loading,
    error,
    createNode,
    renameNode,
    removeNode,
    cloneNode,
  };
};
