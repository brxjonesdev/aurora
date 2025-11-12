import { createStore } from 'zustand/vanilla'
import { ManuscriptTreeNode } from '../types/manuscript'

export type SidebarFileSystemState = {
    tree: ManuscriptTreeNode[];
}

export type SidebarFileSystemActions = {
    setTree: (tree: ManuscriptTreeNode[]) => void;
    addNode: (parentID: string | null, name: string, type: 'file' | 'folder') => void;
    renameNode: (nodeID: string, newName: string) => void;
    deleteNode: (nodeID: string) => void;
    duplicateNode: (node: ManuscriptTreeNode) => void;
}

export type SidebarFileSystemStore = SidebarFileSystemState & SidebarFileSystemActions;

export const initSidebarFileSystemStore = (): SidebarFileSystemState => ({
    tree: [],
});

export const defaultInitState: SidebarFileSystemState = {
    tree: [],
}

export const createSidebarFileSystemStore = (
    initialState: SidebarFileSystemState = defaultInitState
) => {
    return createStore<SidebarFileSystemStore>()((set) => ({
        ...initialState,
        setTree: (tree: ManuscriptTreeNode[]) => set({ tree }),
        addNode: (parentID: string | null, name: string, type: 'file' | 'folder') => { /* Implementation */ },
        renameNode: (nodeID: string, newName: string) => { /* Implementation */ },
        deleteNode: (nodeID: string) => { /* Implementation */ },
        duplicateNode: (node: ManuscriptTreeNode) => { /* Implementation */ },
    }))
}