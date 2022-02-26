import { useEffect } from 'react';

import { SearchForm, useSearchForm } from '@/ui/components';
import { waitFor } from '@/utils';

import { Filters } from './Filters';
import { useSubmitQuery } from './hooks';
import { Results } from './Results';

export function SearchPage() {
  const submitQuery = useSubmitQuery();

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
        <Filters />
      </div>
      <Results />
    </div>
  );
}
