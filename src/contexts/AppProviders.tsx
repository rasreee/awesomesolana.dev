import { AppStateProvider } from './AppStateContext';
import { SearchProvider } from './SearchContext';

export function AppProviders({ children }: { children: any }) {
  return (
    <SearchProvider>
      <AppStateProvider>{children}</AppStateProvider>
    </SearchProvider>
  );
}
