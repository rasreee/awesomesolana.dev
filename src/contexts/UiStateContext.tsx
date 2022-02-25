import { createContext, useContext } from 'react';

import { FiltersMenu } from '@/modules/search';
import { UseModal, useModal } from '@/ui/hooks';

export type IUiStateContext = {
  filtersMenu: UseModal;
};

export const UiStateContext = createContext<IUiStateContext | undefined>(
  undefined,
);

export function useUiState() {
  const context = useContext(UiStateContext);
  if (!context)
    throw new Error('UiStateContext must be defined to use useSearch');
  return context;
}

export function UiStateProvider({ children }: { children: any }) {
  const filtersMenu = useModal();

  return (
    <UiStateContext.Provider
      value={{
        filtersMenu,
      }}
    >
      {children}
      <FiltersMenu />
    </UiStateContext.Provider>
  );
}
