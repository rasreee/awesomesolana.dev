import { createContext, useContext } from 'react';

export type ISearchModalContext<T = any> = {
  isOpen: boolean;
  onRequestOpen: () => void;
  onRequestClose: () => void;
  query: string;
  setQuery: (query: string) => void;
  hits: T[];
  setHits: React.Dispatch<React.SetStateAction<T[]>>;
  error: string | null;
  isRequesting: boolean;
  onSelect: (selectedSearchResult: T) => void;
};

export const SearchModalContext = createContext<
  ISearchModalContext | undefined
>(undefined);

export function useSearchModal() {
  const context = useContext(SearchModalContext);
  if (!context)
    throw new Error('SearchModalContext must be defined to use useSearchModal');
  return context;
}
