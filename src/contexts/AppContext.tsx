import { createContext, useContext } from 'react';

import { UseMenu, useMenu } from '@/ui/hooks';

export type IAppStateContext = {
  filtersMenu: UseMenu;
};

export const AppStateContext = createContext<IAppStateContext | undefined>(
  undefined,
);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context)
    throw new Error('AppStateContext must be defined to use useSearch');
  return context;
}

export function AppStateProvider({ children }: { children: any }) {
  const filtersMenu = useMenu();

  return (
    <AppStateContext.Provider
      value={{
        filtersMenu,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
