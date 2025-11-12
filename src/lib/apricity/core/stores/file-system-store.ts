import { createStore } from 'zustand/vanilla';
import { ManuscriptTreeNode } from '../types/manuscript';

export type SidebarFileSystemState = {
  tree: ManuscriptTreeNode[];
};

export type SidebarFileSystemActions = {
  setTree: (tree: ManuscriptTreeNode[]) => void;
  addNode: (parentID: string | null, name: string, type: 'file' | 'folder') => void;
  updateNode: (nodeID: string, changes: Partial<ManuscriptTreeNode>) => void;
  deleteNode: (nodeID: string) => void;
  duplicateNode: (node: ManuscriptTreeNode) => void;
};

export type SidebarFileSystemStore = SidebarFileSystemState & SidebarFileSystemActions;

export const initSidebarFileSystemStore = (): SidebarFileSystemState => ({
  tree: [],
});

export const defaultInitState: SidebarFileSystemState = {
  tree: [],
};

export const createSidebarFileSystemStore = (
  initialState: SidebarFileSystemState = defaultInitState
) => {
  return createStore<SidebarFileSystemStore>()((set) => ({
    ...initialState,
    setTree: (tree: ManuscriptTreeNode[]) => set({ tree }),
    addNode: (parentID: string | null, name: string, type: 'file' | 'folder') => {
      set((state) => {
        const newNode: ManuscriptTreeNode = {
          id: crypto.randomUUID(),
          name,
          parent_id: parentID,
          type,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          children: [],
        };

        // recursive helper to add newNode under the correct parent
        const addNodeToTree = (nodes: ManuscriptTreeNode[]): ManuscriptTreeNode[] => {
          return nodes.map((node) => {
            if (node.id === parentID && node.type === 'folder') {
              return { ...node, children: [...node.children, newNode] };
            }

            if (node.children && node.children.length > 0) {
              return { ...node, children: addNodeToTree(node.children) };
            }

            return node;
          });
        };

        let updatedTree: ManuscriptTreeNode[];

        if (parentID === null) {
          // add to root
          updatedTree = [...state.tree, newNode];
        } else {
          // add to a nested folder
          updatedTree = addNodeToTree(state.tree);
        }

        return { tree: updatedTree };
      });
    },

    updateNode: (nodeID: string, changes: Partial<ManuscriptTreeNode>) => {
      set((state) => {
        // recursive helper to update node with nodeID
        const updateNodeInTree = (nodes: ManuscriptTreeNode[]): ManuscriptTreeNode[] => {
          return nodes.map((node) => {
            if (node.id === nodeID) {
              return { ...node, ...changes };
            }

            if (node.children && node.children.length > 0) {
              return { ...node, children: updateNodeInTree(node.children) };
            }

            return node;
          });
        };

        const updatedTree = updateNodeInTree(state.tree);
        return { tree: updatedTree };
      });
      
    },
    deleteNode: (nodeID: string) => {
      set((state) => {
        // recursive helper to delete node with nodeID
        const deleteNodeFromTree = (nodes: ManuscriptTreeNode[]): ManuscriptTreeNode[] => {
          return nodes
            .filter((node) => node.id !== nodeID)
            .map((node) => ({
              ...node,
              children: deleteNodeFromTree(node.children),
            }));
        };

        const updatedTree = deleteNodeFromTree(state.tree);
        return { tree: updatedTree };
      });
    },
    duplicateNode: (node: ManuscriptTreeNode) => {
      
      // duplicate helper
      const duplicateNodeHelper = (nodeToDuplicate: ManuscriptTreeNode): ManuscriptTreeNode => {
        const newNode: ManuscriptTreeNode = {
          ...nodeToDuplicate,
          id: crypto.randomUUID(),
          name: `${nodeToDuplicate.name} Copy`,
          slug: `${nodeToDuplicate.slug}-copy`,
          children: nodeToDuplicate.children.map(duplicateNodeHelper),
        };
        return newNode;
      };

      set((state) => {
        const duplicatedNode = duplicateNodeHelper(node);
        const addNodeToTree = (nodes: ManuscriptTreeNode[]): ManuscriptTreeNode[] => {
          return nodes.map((n) => {
            if (n.id === node.parent_id && n.type === 'folder') {
              return { ...n, children: [...n.children, duplicatedNode] };
            }

            if (n.children && n.children.length > 0) {
              return { ...n, children: addNodeToTree(n.children) };
            }

            return n;
          });
        };

        let updatedTree: ManuscriptTreeNode[];

        if (node.parent_id === null) {
          updatedTree = [...state.tree, duplicatedNode];
        } else {
          updatedTree = addNodeToTree(state.tree);
        }

        return { tree: updatedTree };
      });
    },
  }));
};
