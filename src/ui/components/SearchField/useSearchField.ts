import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { waitFor } from '@/common/utils';

import { SearchFieldProps } from './SearchField';

export type UseSearchField<T> = Omit<
  SearchFieldProps,
  'onShowFilters' | 'isFiltersMenuOpen'
> & {
  setQuery: Dispatch<SetStateAction<string>>;
  onChange: Dispatch<SetStateAction<string>>;
  isRequesting: boolean;
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
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hits, setHits] = useState<T[]>([]);

  useEffect(() => {
    if (!query) return;

    const submitQuery = async (query: string) => {
      setIsRequesting(true);
      setError(null);
      try {
        const newHits = await searchFn(query);
        setHits(newHits);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsRequesting(false);
      }
    };

    waitFor(300).then(() => submitQuery(query));
  }, [query]);

  const reset = () => {
    setHits([]);
    setError(null);
    setQuery('');
    setIsRequesting(false);
  };

  return {
    query,
    setQuery,
    hits,
    onChange: setQuery,
    isRequesting,
    error,
    reset,
  };
}
