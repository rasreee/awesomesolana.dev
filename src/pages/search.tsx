import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

import Layout from '@/ui/layout/Layout';

export type Search = {
  query?: string;
  tags?: any[];
};

function parseSearch(parsedUrlQuery: NextRouter['query']): Search {
  const search: Search = {};

  if ('query' in parsedUrlQuery) {
    search.query = parsedUrlQuery['query'] as string;
  }
  if ('tags' in parsedUrlQuery) {
    search.tags = (parsedUrlQuery['tags'] as string).split(',');
  }

  return search;
}

export default function SearchPage() {
  const router = useRouter();

  const search = parseSearch(router.query);

  useEffect(() => {
    console.log('SEARCH: ', search);
  }, [search]);

  return (
    <Layout>
      <h1>SEARCH PAGE</h1>
      <div>{JSON.stringify(search, null, 2)}</div>
    </Layout>
  );
}
