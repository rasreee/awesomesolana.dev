import Layout from '@/ui/layout/Layout';

import { SearchBar } from './SearchBar';
import { useSearch } from './SearchContext';

export function SearchPage() {
  const { search } = useSearch();

  return (
    <Layout>
      <div>{JSON.stringify(search, null, 2)}</div>
      <SearchBar />
    </Layout>
  );
}
