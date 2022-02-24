import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { waitFor } from '@/common/utils';
import { ErrorMessage, StatefulIcon, TextInput } from '@/ui/components';
import { AdjustmentsIcon, SearchIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

const DEFAULT_PLACEHOLDER = 'Search for any project, dependency, or topic';

export type SearchFieldProps = {
  onClickFilters?: () => void;
  isFiltersMenuOpen?: boolean;
  error: string | null;
  isRequesting: boolean;
  query: string;
  onChange: (query: string) => void;
};

export function SearchField({
  onClickFilters,
  isFiltersMenuOpen,
  error,
  isRequesting,
  query,
  onChange,
}: SearchFieldProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div
      className={clsxm(
        'flex flex-1 items-center gap-1 px-2 py-1',
        'input bg-surface-1',
        focused || isFiltersMenuOpen ? 'input-border-focused' : 'input-border',
      )}
    >
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulIcon
        className={clsxm({
          'text-color-primary': focused,
        })}
        label="search"
        loading={isRequesting}
        icon={SearchIcon}
      />
      <TextInput
        type="search"
        name="search"
        className="input-focus-unset"
        placeholder={DEFAULT_PLACEHOLDER}
        value={query}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {onClickFilters && (
        <button
          ref={buttonRef}
          onClick={onClickFilters}
          className={clsxm(
            'text',
            isFiltersMenuOpen || (focused && 'bg-surface text-color-primary'),
            'h-full rounded p-1',
          )}
        >
          <AdjustmentsIcon
            className={clsxm(
              'text-hint',
              isFiltersMenuOpen && 'text-color-primary',
            )}
          />
        </button>
      )}
    </div>
  );
}

export type UseSearchField<T> = Omit<
  SearchFieldProps,
  'onClickFilters' | 'isFiltersMenuOpen'
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
