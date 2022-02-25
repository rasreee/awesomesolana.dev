import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { waitFor } from '@/common/utils';

import { SearchFieldProps } from './SearchField';

export type UseSearchForm = Omit<
  SearchFieldProps,
  'onShowFilters' | 'isFiltersMenuOpen'
> & {
  setQuery: Dispatch<SetStateAction<string>>;
  onChange: Dispatch<SetStateAction<string>>;
  isRequesting: boolean;
  error: string | null;
  reset: () => void;
};

export function useSearchForm(
  submitQuery: (query: string) => any,
  // onSuccess?: (hits: T[]) => any,
): UseSearchForm {
  const [query, setQuery] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    waitFor(200).then(() => submitQuery(query));
  }, [query]);

  const reset = () => {
    setError(null);
    setQuery('');
    setIsRequesting(false);
  };

  return {
    query,
    setQuery,
    onChange: setQuery,
    isRequesting,
    error,
    reset,
  };
}
