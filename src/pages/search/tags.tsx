import { SearchPage as SearchTags } from '@modules/search/SearchPage';

import { SearchPageLayout } from '@/modules/search/SearchPageLayout';

(SearchTags as any).Layout = SearchPageLayout;

export default SearchTags;
