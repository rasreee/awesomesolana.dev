import dynamic from 'next/dynamic';

const Search = dynamic(() => import('@/modules/search/SearchPage'));

(Search as any).Layout = dynamic(() => import('@/layouts/PageLayout'));

export default Search;
