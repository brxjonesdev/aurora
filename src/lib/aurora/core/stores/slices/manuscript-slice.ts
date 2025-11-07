import { StateCreator } from "zustand"
import { ManuscriptMetadata, ManuscriptTreeNode } from "../../types/manuscript"
import { ApricityStore } from "../apricity-store"

export type ManuscriptSliceState = {
    metadata: ManuscriptMetadata | null
    tree: ManuscriptTreeNode | null
}

export type ManuscriptSliceActions = {
    setMetadata: (metadata: ManuscriptMetadata) => void
    updateMetadata: (metadata: Partial<ManuscriptMetadata>) => void
    clearMetadata: () => void
    setTree: (tree: ManuscriptTreeNode) => void
    updateTreeNode: (nodeID: string, node: Partial<ManuscriptTreeNode>) => void
    removeTreeNode: (nodeID: string) => void
}

export type ManuscriptSlice = ManuscriptSliceState & ManuscriptSliceActions

export const createManuscriptSlice: StateCreator<ApricityStore, [["zustand/immer", never]], [], ManuscriptSlice> = (set) => ({
    metadata: null,
    tree: null,
    setMetadata: (metadata: ManuscriptMetadata) => set({ metadata }),
    updateMetadata: (metadata) => set((state) => ({ metadata: { ...state.metadata!, ...metadata } })),
    clearMetadata: () => set({ metadata: null }),
    setTree: (tree: ManuscriptTreeNode) => set({ tree }),
    updateTreeNode: (nodeID, node) =>
        set((state) => {
            const updateNode = (n: ManuscriptTreeNode): ManuscriptTreeNode | null => {
                if (n.id === nodeID) {
                    return { ...n, ...node };
                }
                if (n.type === 'folder' && n.children) {
                    return {
                        ...n,
                        children: n.children.map(updateNode).filter(Boolean) as ManuscriptTreeNode[],
                    };
                }
                return n;
            };

            if (!state.tree) return state;

            const updatedTree = updateNode(state.tree);
            return { tree: updatedTree };
        }),
    removeTreeNode: (nodeID) =>
        set((state) => {
            const removeNode = (n: ManuscriptTreeNode): ManuscriptTreeNode | null => {
                if (n.id === nodeID) {
                    return null;
                }
                if (n.type === 'folder' && n.children) {
                    return {
                        ...n,
                        children: n.children.map(removeNode).filter(Boolean) as ManuscriptTreeNode[],
                    };
                }
                return n;
            };

            if (!state.tree || !state.tree.children || state.tree.id === nodeID) {
                return { tree: null };
            }

                    const updatedTree = removeNode(state.tree);
                    return { tree: updatedTree };
                }),
        })