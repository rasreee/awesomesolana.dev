import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSearchState } from '@/hooks/useSearchState';
import { SearchForm, Seo, useSearchForm } from '@/ui/components';
import { waitFor } from '@/utils';

import { Results } from './Results';
import { TagTypeModal } from './tags/TagTypeModal';
import { TagTypesControls } from './tags/TagTypesControls';

export const SearchPage = () => {
  const router = useRouter();
  const { tags } = useSearchState();

  const submitQuery = (q: string) => {
    const queryString = q.trim();

    if (!queryString)
      return router.push(
        `/search${
          tags.length
            ? '?' +
              tags.map((filter) => filter.type + '=' + filter.name).join('&')
            : ''
        }`,
        undefined,
        { shallow: true },
      );

    const newPath = `/search?q=${query}${
      tags.length
        ? '&' + tags.map((filter) => filter.type + '=' + filter.name).join('&')
        : ''
    }`;

    router.push(newPath, undefined, { shallow: true });
  };

  const { query, setQuery, setLoading, setError, ...restSearchForm } =
    useSearchForm();

  const handleSubmit = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      await submitQuery(query);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    waitFor(300).then(() => handleSubmit(query));
  }, [query]);

  return (
    <>
      <Seo title="Search" />
      <div className="flex-1 px-3 sm:px-6">
        <div className="flex flex-col gap-2">
          <SearchForm {...{ query, ...restSearchForm }} onSubmit={setQuery} />
          <TagTypesControls />
          <TagTypeModal />
        </div>
        <Results />
      </div>
    </>
  );
};
