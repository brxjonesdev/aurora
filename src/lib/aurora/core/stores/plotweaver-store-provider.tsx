'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type PlotweaverStore,
  createPlotweaverStore,
} from '@/lib/aurora/core/stores/plotweaver-store';

export type PlotweaverStoreApi = ReturnType<typeof createPlotweaverStore>;

export const PlotweaverStoreContext = createContext<PlotweaverStoreApi | undefined>(undefined);

export interface PlotweaverStoreProviderProps {
  children: ReactNode;
}

export const PlotweaverStoreProvider = ({ children }: PlotweaverStoreProviderProps) => {
  const storeRef = useRef<PlotweaverStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPlotweaverStore();
  }

  return (
    <PlotweaverStoreContext.Provider value={storeRef.current}>
      {children}
    </PlotweaverStoreContext.Provider>
  );
};

export const usePlotweaverStore = <T,>(selector: (store: PlotweaverStore) => T): T => {
  const plotweaverStoreContext = useContext(PlotweaverStoreContext);

  if (!plotweaverStoreContext) {
    throw new Error(`usePlotweaverStore must be used within PlotweaverStoreProvider`);
  }

  return useStore(plotweaverStoreContext, selector);
};
