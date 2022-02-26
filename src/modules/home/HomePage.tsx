import { getTagSuggestions, SEARCH_TAGS, Tag } from '@api/tags';
import { useEffect, useState } from 'react';

import { siteConfig } from '@/configs/site-config';
import { useToggleTag } from '@/hooks/useToggleTag';
import { Logo, SearchForm, Seo, useSearchForm } from '@/ui/components';
import { waitFor } from '@/utils';

import { GroupedResults } from './GroupedResults';

export function HomePage() {
  const searchBox = useSearchForm();
  const [hits, setHits] = useState<Tag[]>([]);

  const toggleTag = useToggleTag();

  const handleSubmit = async (query: string) => {
    const { setLoading, setError } = searchBox;
    setLoading(true);
    setError(null);
    await waitFor(300);
    try {
      const newHits = await getTagSuggestions(query);
      setHits(newHits);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchBox.query;

    if (!query) return setHits([]);

    handleSubmit(query);
  }, [searchBox.query]);

  const handleInputClick = () => {
    console.log('handleInputClick');
    setHits(SEARCH_TAGS.slice(0, 10));
  };

  const closeResults = () => {
    searchBox.onReset();
    setHits([]);
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
            {...searchBox}
            onClick={handleInputClick}
            onSubmit={handleSubmit}
          />
          <GroupedResults
            isOpen={hits.length > 0}
            hits={hits}
            onTagClick={toggleTag}
            onClose={closeResults}
          />
        </div>
      </div>
    </>
  );
}
