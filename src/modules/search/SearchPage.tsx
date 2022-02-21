import { useRouter } from 'next/router';

import Layout from '@/ui/layout/Layout';

import { parseSearch } from './search';
import { SearchBar } from './SearchBar';

export function SearchPage() {
  const router = useRouter();

  const search = parseSearch(router.query);

  return (
    <Layout>
      <div>{JSON.stringify(search, null, 2)}</div>
      <SearchBar />
    </Layout>
  );
}
