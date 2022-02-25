import { createContext, useContext } from 'react';

import { FiltersMenu } from '@/modules/search';
import { UseModal, useModal } from '@/ui/hooks';

export type IAppStateContext = {
  filtersMenu: UseModal;
};

export const AppStateContext = createContext<IAppStateContext | undefined>(
  undefined,
);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context)
    throw new Error('AppStateContext must be defined to use useAppState');
  return context;
}

export function AppStateProvider({ children }: { children: any }) {
  const filtersMenu = useModal();

  return (
    <AppStateContext.Provider
      value={{
        filtersMenu,
      }}
    >
      <div className="w-full gap-3 sm:flex sm:items-start">
        {children}
        <FiltersMenu />
      </div>
    </AppStateContext.Provider>
  );
}
