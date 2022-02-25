import { SearchProvider } from './SearchContext';
import { SearchOptionsMenuProvider } from './SearchOptionsMenuContext';

export function AppProviders({ children }: { children: any }) {
  return (
    <SearchProvider>
      <SearchOptionsMenuProvider>{children}</SearchOptionsMenuProvider>
    </SearchProvider>
  );
}
