import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSearchState } from '@/hooks/useSearchState';
import { SearchForm, useSearchForm } from '@/ui/components';
import { waitFor } from '@/utils';

import { FilterCategoriesControls } from './filters/FilterCategoriesBar';
import { FilterCategoryModal } from './filters/FilterCategoryModal';
import { Results } from './Results';

export function SearchPage() {
  const router = useRouter();
  const { filters } = useSearchState();

  const submitQuery = (q: string) => {
    const queryString = q.trim();

    if (!queryString)
      return router.push(
        `/search${
          filters.length
            ? '?' +
              filters
                .map((filter) => filter.category + '=' + filter.name)
                .join('&')
            : ''
        }`,
        undefined,
        { shallow: true },
      );

    const newPath = `/search?q=${query}${
      filters.length
        ? '&' +
          filters.map((filter) => filter.category + '=' + filter.name).join('&')
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
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex flex-col gap-2">
        <SearchForm {...{ query, ...restSearchForm }} onSubmit={setQuery} />
        <FilterCategoriesControls />
        <FilterCategoryModal />
      </div>
      <Results />
    </div>
  );
}
