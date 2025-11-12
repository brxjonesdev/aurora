'use client';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type SidebarFileSystemStore,
  createSidebarFileSystemStore,
  initSidebarFileSystemStore,
} from '../stores/file-system-store';

export type FileSystemApi = ReturnType<typeof createSidebarFileSystemStore>;

const FileSystemContext = createContext<FileSystemApi | undefined>(undefined);

export interface FileSystemProviderProps {
  children: ReactNode;
}

export const FileSystemProvider = ({ children }: FileSystemProviderProps) => {
  const storeRef = useRef<FileSystemApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createSidebarFileSystemStore(initSidebarFileSystemStore());
  }
  return (
    <FileSystemContext.Provider value={storeRef.current}>{children}</FileSystemContext.Provider>
  );
};

export const useFileSystemStore = <T,>(selector: (store: SidebarFileSystemStore) => T): T => {
  const fileSystemContext = useContext(FileSystemContext);
  if (!fileSystemContext) {
    throw new Error('useFileSystemStore must be used within a FileSystemProvider');
  }
  return useStore(fileSystemContext, selector);
};
