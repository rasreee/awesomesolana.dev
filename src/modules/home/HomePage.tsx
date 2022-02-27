import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

import { siteConfig } from '@/configs/site-config';
import { allTags } from '@/core/search';
import { Logo, SearchForm, Seo } from '@/ui/components';

import { useSearchStore } from '../search/SearchStore';
import { GroupedResults } from './GroupedResults';

export const HomePage = observer(function HomePage() {
  const store = useSearchStore();

  const handleInputClick = () => {
    runInAction(() => (store.tagsSearchResult = allTags.slice(0, 10)));
  };

  return (
    <>
      <Seo title="Home" description={siteConfig.seo.description} />
      <div className="min-h-main mx-auto flex w-full flex-1 flex-col gap-10 px-6 pt-28 md:max-w-3xl md:pt-36">
        <div className="flex flex-col items-center justify-center gap-6">
          <Logo size="lg" />
          <div className="text-body text-center text-base leading-normal text-opacity-80 sm:text-lg md:text-xl">
            {siteConfig.seo.description}
          </div>
        </div>
        <div className="flex h-min flex-col gap-3">
          <SearchForm
            {...store.searchForm}
            onClick={handleInputClick}
            onSubmit={store.submitTagsSearch}
          />
          <GroupedResults
            isOpen={store.tagsSearchResult.length > 0}
            hits={store.tagsSearchResult}
            onTagClick={store.toggleTag}
            onClose={store.reset}
          />
        </div>
      </div>
    </>
  );
});
