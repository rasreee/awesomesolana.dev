import { createContext } from 'react';

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

function AppStateProvider({ children }: { children: any }) {
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

export default AppStateProvider;
