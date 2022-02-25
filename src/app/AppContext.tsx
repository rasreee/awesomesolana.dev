import { createContext, useContext } from 'react';

import {
  SearchFieldProps,
  useSearchForm,
  useSubmitQuery,
} from '@/modules/search';
import { UseOverlay, useOverlay } from '@/ui/hooks';

export type IAppStateContext = {
  searchOptions: UseOverlay;
  searchField: SearchFieldProps;
};

export const AppStateContext = createContext<IAppStateContext | undefined>(
  undefined,
);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context)
    throw new Error(
      'AppStateContext must be defined to use useAppSearchOptions',
    );
  return context;
}

export function AppProvider({ children }: { children: any }) {
  const searchOptions = useOverlay();
  const submitQuery = useSubmitQuery();
  const searchField = useSearchForm((query) => submitQuery(query));

  return (
    <AppStateContext.Provider
      value={{
        searchOptions,
        searchField,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppSearchOptions(): IAppStateContext['searchOptions'] {
  return useAppState().searchOptions;
}

export function useAppSearchField(): IAppStateContext['searchField'] {
  return useAppState().searchField;
}
