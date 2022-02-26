import { createContext } from 'react';

import { UseOverlay, useOverlay } from '@/ui/hooks';

export type IAppStateContext = {
  searchOptions: UseOverlay;
};

export const AppStateContext = createContext<IAppStateContext | undefined>(
  undefined,
);

function AppStateProvider({ children }: { children: any }) {
  const searchOptions = useOverlay();

  return (
    <AppStateContext.Provider
      value={{
        searchOptions,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateProvider;
