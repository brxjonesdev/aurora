/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand';
import { ApricityStore } from '../apricity-store';
import type { 
  ManuscriptDBNode, 
  ManuscriptTreeNode, 
  ManuscriptMetadata 
} from '../../types/manuscript';

export type ManuscriptSliceState = {
  manuscriptMetadata: ManuscriptMetadata | null;
  manuscriptTree: ManuscriptTreeNode | null;
  errors: Record<string, string>;
};

export type ManuscriptSliceActions = {
  setManuscriptMetadata: (metadata: ManuscriptMetadata) => void;
  setManuscriptNodes: (nodes: ManuscriptDBNode[]) => void;
  addTreeNode: (node: ManuscriptDBNode, parentId: string | null) => void;
  updateTreeNode: (node: Partial<ManuscriptDBNode> & { id: string }) => void;
  removeTreeNode: (id: string) => void;
  setError: (id: string, error: string) => void;
  clearError: (id: string) => void;
};

export type ManuscriptSlice = ManuscriptSliceState & ManuscriptSliceActions;

// --- Tree helpers ---
const buildTree = (nodes: ManuscriptDBNode[]): ManuscriptTreeNode | null => {
  const nodeMap: Record<string, ManuscriptTreeNode> = {};
  nodes.forEach(node => { nodeMap[node.id] = { ...node, children: [] }; });

  let root: ManuscriptTreeNode | null = null;
  nodes.forEach(node => {
    if (node.parent_id === null) {
      root = nodeMap[node.id];
    } else {
      const parent = nodeMap[node.parent_id];
      if (parent) parent.children.push(nodeMap[node.id]);
    }
  });
  return root;
};

const findNode = (root: ManuscriptTreeNode | null, id: string): ManuscriptTreeNode | null => {
  if (!root) return null;
  if (root.id === id) return root;
  for (const child of root.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
};

const addNode = (root: ManuscriptTreeNode | null, node: ManuscriptDBNode, parentId?: string | null): ManuscriptTreeNode => {
  if (!root) return { ...node, children: [] };

  const newNode: ManuscriptTreeNode = { ...node, children: [] };
  const targetParentId = parentId ?? node.parent_id ?? root.id;

  const recursiveAdd = (current: ManuscriptTreeNode): boolean => {
    if (current.id === targetParentId) {
      current.children.push(newNode);
      return true;
    }
    for (const child of current.children) {
      if (recursiveAdd(child)) return true;
    }
    return false;
  };

  recursiveAdd(root);
  return root;
};




const updateNode = (root: ManuscriptTreeNode | null, node: Partial<ManuscriptDBNode> & { id: string }): ManuscriptTreeNode | null => {
  const target = findNode(root, node.id);
  if (target) Object.assign(target, node);
  return root;
};

const removeNode = (root: ManuscriptTreeNode | null, id: string): ManuscriptTreeNode | null => {
  if (!root) return null;
  root.children = root.children.filter(child => child.id !== id).map(child => removeNode(child, id) || child);
  if (root.id === id) return null;
  return root;
};

// --- Slice ---
export const createManuscriptSlice: StateCreator<
  ApricityStore, 
  [["zustand/immer", never]], 
  [], 
  ManuscriptSlice
> = (set) => ({
  manuscriptMetadata: null,
  manuscriptTree: null,
  errors: {},

  setManuscriptMetadata: (metadata) => set(state => { state.manuscriptMetadata = metadata; }),

  setManuscriptNodes: (nodes) => set(state => { state.manuscriptTree = buildTree(nodes); }),

  addTreeNode: (node, parentId) => set(state => {
  state.manuscriptTree = addNode(state.manuscriptTree, node, parentId);
}),


  updateTreeNode: (node) => set(state => {
    state.manuscriptTree = updateNode(state.manuscriptTree, node);
  }),

  removeTreeNode: (id) => set(state => {
    state.manuscriptTree = removeNode(state.manuscriptTree, id);
  }),

  setError: (id, error) => set(state => {
    state.errors[id] = error;
  }),

  clearError: (id) => set(state => {
    delete state.errors[id];
  }),
});
