import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { siteConfig } from '@/configs/site-config';
import { searchRoute, Tag } from '@/core/search';
import { useSearchStore } from '@/stores/root-store';
import { Logo, Seo, TagsSearchBox } from '@/ui/components';

import { GroupedResults } from './GroupedResults';

export const HomePage = observer(function HomePage() {
  const store = useSearchStore();
  const router = useRouter();

  const handleTagClick = (tag: Tag) => {
    router.push(searchRoute.page({ tags: [tag] }));
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
          <TagsSearchBox />
          <GroupedResults
            isOpen={!!store.tagsSearch.hits.length}
            hits={store.tagsSearch.hits}
            onTagClick={handleTagClick}
            onClose={store.tagsSearch.onReset}
          />
        </div>
      </div>
    </>
  );
});
