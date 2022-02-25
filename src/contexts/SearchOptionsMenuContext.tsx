import { createContext, useContext } from 'react';

import { FiltersMenu } from '@/modules/search';
import { UseModal, useModal } from '@/ui/hooks';

export type ISearchOptionsMenuContext = {
  filtersMenu: UseModal;
};

export const SearchOptionsMenuContext = createContext<
  ISearchOptionsMenuContext | undefined
>(undefined);

export function useSearchOptionsMenu() {
  const context = useContext(SearchOptionsMenuContext);
  if (!context)
    throw new Error(
      'SearchOptionsMenuContext must be defined to use useSearch',
    );
  return context;
}

export function SearchOptionsMenuProvider({ children }: { children: any }) {
  const filtersMenu = useModal();

  return (
    <SearchOptionsMenuContext.Provider
      value={{
        filtersMenu,
      }}
    >
      <div className="w-full gap-3 sm:flex sm:items-start">
        {children}
        <FiltersMenu />
      </div>
    </SearchOptionsMenuContext.Provider>
  );
}
