import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { waitFor } from '@/common/utils';

import { SearchFieldProps } from './SearchField';

export type UseSearchField<T> = Omit<
  SearchFieldProps,
  'onShowFilters' | 'isFiltersMenuOpen'
> & {
  setQuery: Dispatch<SetStateAction<string>>;
  onChange: Dispatch<SetStateAction<string>>;
  loading: boolean;
  error: string | null;
  hits: T[];
  reset: () => void;
};

export type SearchFn<T> = (query: string) => Promise<T[]>;

export function useSearchField<T = any>(
  searchFn: SearchFn<T>,
  // onSuccess?: (hits: T[]) => any,
): UseSearchField<T> {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hits, setHits] = useState<T[]>([]);

  useEffect(() => {
    const submitQuery = async (query: string) => {
      if (!query) {
        return setHits([]);
      }
      setLoading(true);
      setError(null);
      try {
        const newHits = await searchFn(query);
        setHits(newHits);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    waitFor(200).then(() => submitQuery(query));
  }, [query]);

  const reset = () => {
    setHits([]);
    setError(null);
    setQuery('');
    setLoading(false);
  };

  return {
    query,
    setQuery,
    hits,
    onChange: setQuery,
    loading,
    error,
    reset,
  };
}
