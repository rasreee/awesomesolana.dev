import { createContext, useContext } from 'react';

import { SearchData } from './types';

export interface ISearchModalContext {
  isOpen: boolean;
  onRequestOpen: () => void;
  onRequestClose: () => void;
  query: string;
  setQuery: (query: string) => void;
  hits: SearchData[];
  setHits: (hits: SearchData[]) => void;
  error: string | null;
  isRequesting: boolean;
  onSelect: (selectedSearchResult: SearchData) => void;
}

export const SearchModalContext = createContext<
  ISearchModalContext | undefined
>(undefined);

export function useSearchModal() {
  const context = useContext(SearchModalContext);
  if (!context)
    throw new Error('SearchModalContext must be defined to use useSearchModal');
  return context;
}
