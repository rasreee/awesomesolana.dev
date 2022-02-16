import { createContext, useContext } from 'react';

import { SearchResultData } from './types';

export interface ISearchModalContext {
  isOpen: boolean;
  onRequestOpen: () => void;
  onRequestClose: () => void;
  query: string;
  setQuery: (query: string) => void;
  hits: SearchResultData[];
  setHits: (hits: SearchResultData[]) => void;
  error: string | null;
  isRequesting: boolean;
  onSelect: (selectedSearchResult: SearchResultData) => void;
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
