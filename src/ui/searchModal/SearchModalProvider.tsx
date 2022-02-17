import { ReactNode, useEffect, useState } from 'react';

import { useDebouncedState } from '@/hooks/useDebouncedState';
import { useKeyCombo } from '@/hooks/useKeyCombo';
import { EventKeys } from '@/hooks/useKeyPress';
import { waitFor } from '@/lib/waitFor';

import { getSearchResultsForQuery } from './getSearchResultsForQuery';
import SearchModal from './SearchModal';
import { SearchModalContext } from './SearchModalContext';
import { SearchData } from './types';

const DELAY_MS = 600;

type SearchModalProviderProps<T extends SearchData> = {
  children: ReactNode;
  onSelect: (selectedSearchResult: SearchData) => void;
  allData: T[];
};

const SearchModalProvider = <T extends SearchData>({
  children,
  onSelect,
  allData,
}: SearchModalProviderProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const onRequestOpen = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);

  useKeyCombo([EventKeys.META, 'k'], onRequestOpen);

  const [query, setQuery] = useState('');
  const [hits, setHits] = useDebouncedState<SearchData[]>([], DELAY_MS);

  const [error, setError] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const updateHits = async () => {
      setIsRequesting(true);
      setError(null);
      let newHits: SearchData[] = [];
      let newError: string | null = null;
      try {
        newHits = await getSearchResultsForQuery(query, allData);
        setHits(newHits);
      } catch (e) {
        console.error(e);
        newError = (e as Error).message;
      } finally {
        await waitFor(DELAY_MS);
        setIsRequesting(false);
        setError(newError);
        setHits(newHits);
      }
    };

    updateHits();
  }, [query, setError, setHits, setIsRequesting]);

  return (
    <SearchModalContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
        query,
        setQuery,
        hits,
        setHits,
        error,
        isRequesting,
        onSelect,
      }}
    >
      {children}
      <SearchModal />
    </SearchModalContext.Provider>
  );
};

export default SearchModalProvider;
