import dynamic from 'next/dynamic';

const Search = dynamic(() => import('@/modules/search/SearchPage'));

(Search as any).Layout = dynamic(() => import('@/layouts/SearchPageLayout'));

export default Search;
