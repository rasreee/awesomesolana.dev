import { useContext } from 'react';

import { AppStateContext, IAppStateContext } from './AppStateProvider';

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context)
    throw new Error(
      'AppStateContext must be defined to use useAppSearchOptions',
    );
  return context;
}

export function useAppSearchOptions(): IAppStateContext['searchOptions'] {
  return useAppState().searchOptions;
}

export function useAppSearchField(): IAppStateContext['searchField'] {
  return useAppState().searchField;
}
