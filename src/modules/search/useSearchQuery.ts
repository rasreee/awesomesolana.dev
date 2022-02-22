import { useEffect, useState } from 'react';

import { waitFor } from '@/lib/waitFor';

export function useSearchQuery(
  query: string,
  {
    searchFn,
    onSuccess,
  }: {
    searchFn: (q: string) => Promise<any>;
    onSuccess: (results: any) => any;
  },
): {
  error: string | null;
  isRequesting: boolean;
  setIsRequesting: any;
  setError: any;
} {
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

  return { error, isRequesting, setError, setIsRequesting };
}
