import { createContext, useContext } from 'react';

import { FiltersMenu } from '@/modules/search';
import { UseOverlay, useOverlay } from '@/ui/hooks';

export type AppStateContext = {
  searchOptions: UseOverlay;
};

export const AppStateContext = createContext<AppStateContext | undefined>(
  undefined,
);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context)
    throw new Error('AppStateContext must be defined to use useSearchOptions');
  return context;
}

export function AppProvider({ children }: { children: any }) {
  const searchOptions = useOverlay();

  return (
    <AppStateContext.Provider
      value={{
        searchOptions,
      }}
    >
      <div className="w-full gap-3 sm:flex sm:items-start">
        {children}
        <FiltersMenu />
      </div>
    </AppStateContext.Provider>
  );
}

export function useSearchOptions() {
  return useAppState().searchOptions;
}
