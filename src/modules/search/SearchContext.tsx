import { useRouter } from 'next/router';
import { createContext, useContext, useMemo } from 'react';

import { parseSearch, Search } from './search';

export type ISearchContext = {
  search: Search;
};

export const SearchContext = createContext<ISearchContext | undefined>(
  undefined,
);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error('SearchContext must be defined to use useSearch');
  return context;
}

export function SearchProvider({ children }: { children: any }) {
  const router = useRouter();

  const search = useMemo(() => parseSearch(router.query), [router.query]);

  return (
    <SearchContext.Provider value={{ search }}>
      {children}
    </SearchContext.Provider>
  );
}
