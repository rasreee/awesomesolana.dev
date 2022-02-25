import { FiltersMenu } from '@/modules/search';

import { SearchProvider } from './SearchContext';
import { UiStateProvider } from './UiStateContext';

export function AppProviders({ children }: { children: any }) {
  return (
    <SearchProvider>
      <UiStateProvider>
        {children}
        <FiltersMenu />
      </UiStateProvider>
    </SearchProvider>
  );
}
