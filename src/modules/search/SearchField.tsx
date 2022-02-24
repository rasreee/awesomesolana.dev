import { useRef, useState } from 'react';

import { useSearch } from '@/contexts/search';
import { ErrorMessage, StatefulIcon, TextInput } from '@/ui/components';
import { AdjustmentsIcon, SearchIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

const DEFAULT_PLACEHOLDER = 'Search for any project, dependency, or topic';

export function SearchField({
  onClickFilters,
  FiltersOpen,
}: {
  onClickFilters?: () => void;
  FiltersOpen?: boolean;
}) {
  const { query, setQuery, error, isRequesting } = useSearch();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div
      className={clsxm(
        'bg-surface',
        'flex flex-1 items-center gap-1 rounded-lg px-2 py-1',
        focused || FiltersOpen
          ? 'border-2 border-indigo-400 dark:border-indigo-600'
          : 'border border-base-300 dark:border-base-500',
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
        placeholder={DEFAULT_PLACEHOLDER}
        value={query}
        onChange={setQuery}
        className="text-base"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {onClickFilters && (
        <button
          ref={buttonRef}
          onClick={onClickFilters}
          className={clsxm(
            'text',
            FiltersOpen || (focused && 'bg-surface text-indigo-600'),
            'h-full rounded p-1',
          )}
        >
          <AdjustmentsIcon
            className={clsxm('text-hint', FiltersOpen && 'text-indigo-500')}
          />
        </button>
      )}
    </div>
  );
}
