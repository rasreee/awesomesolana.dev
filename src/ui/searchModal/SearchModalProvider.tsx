import { ReactNode, useEffect, useState } from 'react';

import { useDebouncedState } from '@/hooks/useDebouncedState';
import { useKeyCombo } from '@/hooks/useKeyCombo';
import { EventKeys } from '@/hooks/useKeyPress';
import { waitFor } from '@/lib/waitFor';

import { getSearchResultsForQuery } from './getSearchResultsForQuery';
import SearchModal from './SearchModal';
import { SearchModalContext } from './SearchModalContext';
import { SearchResultData } from './types';

const DELAY_MS = 600;

type SearchModalProviderProps = {
  children: ReactNode;
  onSelect: (selectedSearchResult: SearchResultData) => void;
};

const SearchModalProvider = ({
  children,
  onSelect,
}: SearchModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onRequestOpen = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);

  useKeyCombo([EventKeys.META, 'k'], onRequestOpen);

  const [query, setQuery] = useState('');
  const [hits, setHits] = useDebouncedState<SearchResultData[]>([], DELAY_MS);

  const [error, setError] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const updateHits = async () => {
      setIsRequesting(true);
      setError(null);
      let newHits: SearchResultData[] = [];
      let newError: string | null = null;
      try {
        newHits = await getSearchResultsForQuery(query);
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
