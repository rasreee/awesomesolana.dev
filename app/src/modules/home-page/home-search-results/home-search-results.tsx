import { Tag } from '@awesomesolana/common';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useSearchQuery } from '@/hooks/useSearchQuery';
import { useStore } from '@/lib/mobx/store-context';
import PopularTags from '@/modules/common/popular-tags';
import Popover from '@/ui/popover';

import { HomePageStore } from '../home-page-store';
import GroupedTagsOptions from './grouped-tags-options';

const HomeSearchResults = observer(() => {
  const { routeTo } = useSearchQuery();

  const homePageStore = useStore<HomePageStore>();

  const isEmptyState = !homePageStore.search.results.length;

  const handleSelect = (tag: Tag) => routeTo('/repos', { tags: [tag] });

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      onClose={homePageStore.closeMenu}
      isOpen={homePageStore.menu.isOpen}
    >
      {isEmptyState ? (
        <PopularTags onSelect={handleSelect} />
      ) : (
        <GroupedTagsOptions
          options={toJS(homePageStore.search.results)}
          onSelect={handleSelect}
        />
      )}
    </Popover>
  );
});

export default HomeSearchResults;
