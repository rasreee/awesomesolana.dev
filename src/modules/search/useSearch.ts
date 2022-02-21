import { ChangeEventHandler, useEffect, useState } from 'react';

import { waitFor } from '@/lib/waitFor';

export function useSearch({
  searchFn,
  onSuccess,
}: {
  searchFn: (q: string) => Promise<any>;
  onSuccess: (results: any) => any;
}): {
  error: string | null;
  isRequesting: boolean;
  setIsRequesting: any;
  setError: any;
  bindInput: {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
} {
  const [query, setQuery] = useState('');

  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runSearch = async (searchQuery: string) => {
      await waitFor(300);
      setError(null);
      setIsRequesting(true);
      try {
        const result = await searchFn(searchQuery);
        onSuccess(result);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
          setError(e.message);
        }
      } finally {
        setIsRequesting(false);
      }
    };

    runSearch(query);
  }, [query]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.currentTarget.value);
  };

  const bindInput = { value: query, onChange: handleChange };

  return { error, isRequesting, setError, setIsRequesting, bindInput };
}
