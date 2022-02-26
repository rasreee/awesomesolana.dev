import { getTagSuggestions, Tag } from '@modules/tags';
import { useEffect, useState } from 'react';

import { siteConfig } from '@/configs/site-config';
import { useToggleFilter } from '@/hooks/useToggleFilter';
import { Logo, SearchForm, useSearchForm } from '@/ui/components';
import { waitFor } from '@/utils';

import { GroupedResults } from './GroupedResults';

export function HomePage() {
  const searchBox = useSearchForm();
  const [hits, setHits] = useState<Tag[]>([]);

  const toggleFilter = useToggleFilter();

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

  return (
    <div className="mx-auto px-6 md:max-w-3xl">
      <div className="my-24 flex w-full flex-col gap-10">
        <div className="mx-auto flex flex-col items-center gap-6">
          <Logo size="lg" />
          <div className="text-body  text-center text-base leading-normal text-opacity-80 sm:text-lg md:text-xl">
            {siteConfig.seo.description}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <SearchForm {...searchBox} onSubmit={handleSubmit} />
          <GroupedResults
            isOpen={hits.length > 0}
            hits={hits}
            onAddFilter={toggleFilter}
            onClose={searchBox.onReset}
          />
        </div>
      </div>
    </div>
  );
}
