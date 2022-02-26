import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { waitFor } from '@/common/utils';

export type UseSearchForm = {
  query: string;
  error: string | null;
  loading: boolean;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setQuery: Dispatch<SetStateAction<string>>;
  onChange: Dispatch<SetStateAction<string>>;
};

export function useSearchForm(
  submitQuery: (query: string) => any,
): UseSearchForm {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    waitFor(200).then(() => submitQuery(query));
  }, [query]);

  return {
    query,
    setQuery,
    onChange: setQuery,
    loading,
    setLoading,
    setError,
    error,
  };
}
