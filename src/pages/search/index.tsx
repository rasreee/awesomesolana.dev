import Layout from '@layouts/Layout';
import { SearchPage as Search } from '@modules/search/SearchPage';

(Search as any).Layout = Layout;

export default Search;
