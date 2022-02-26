import Layout from '@layouts/Layout';
import { SearchPage as SearchTags } from '@modules/search/SearchPage';

(SearchTags as any).Layout = Layout;

export default SearchTags;
