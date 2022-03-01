import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { appRoute } from '@/app/routes';
import { Tag } from '@/domains/tags/types';
import { useStore } from '@/lib/mobx/store-context';
import PopularTags from '@/modules/common/popular-tags';
import Popover from '@/ui/popover';

import { HomePageStore } from '../home-page-store';
import GroupedTagsOptions from './grouped-tags-options';

const HomeSearchResults = observer(() => {
  const router = useRouter();

  const handleSelectTag = (tag: Tag) => {
    router.push(appRoute.repos.search({ tags: [tag] }));
  };

  const homePageStore = useStore<HomePageStore>();

  const isEmptyState = !homePageStore.search.results.length;

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      onClose={homePageStore.closeMenu}
      isOpen={homePageStore.menu.isOpen}
    >
      {isEmptyState ? (
        <PopularTags onSelect={handleSelectTag} />
      ) : (
        <GroupedTagsOptions
          options={toJS(homePageStore.search.results)}
          onSelect={handleSelectTag}
        />
      )}
    </Popover>
  );
});

export default HomeSearchResults;
