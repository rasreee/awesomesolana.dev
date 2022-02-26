import { SearchPage as Search } from '@modules/search/SearchPage';

import { SearchPageLayout } from '@/modules/search/SearchPageLayout';

(Search as any).Layout = SearchPageLayout;

export default Search;
