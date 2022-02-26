import { Dispatch, SetStateAction, useState } from 'react';

export type UseSearchForm = {
  query: string;
  error: string | null;
  loading: boolean;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setQuery: Dispatch<SetStateAction<string>>;
  onReset: () => void;
  onChange: (query: string) => void;
};

export function useSearchForm(): UseSearchForm {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setError(null);
    setQuery('');
    setLoading(false);
  };

  return {
    query,
    setQuery,
    loading,
    setLoading,
    setError,
    error,
    onReset: handleReset,
    onChange: setQuery,
  };
}
