import { observer } from 'mobx-react-lite';

import { useStore } from '@/lib/mobx/store-context';
import RecommendedTags from '@/modules/tags-search/recommended-tags';
import Popover from '@/ui/popover';

import { HomePageStore } from '../home-page-store';
import GroupedResults from './grouped-results';

const SearchResults = observer(({}: {}) => {
  const homePageStore = useStore<HomePageStore>();

  const isEmptyState = !homePageStore.search.results.length;

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      onClose={homePageStore.closeMenu}
      isOpen={homePageStore.menu.isOpen}
    >
      {isEmptyState ? <RecommendedTags /> : <GroupedResults />}
    </Popover>
  );
});

export default SearchResults;
