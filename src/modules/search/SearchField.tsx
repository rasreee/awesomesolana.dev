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
        'flex flex-1 items-center gap-1 px-2 py-1',
        'input',
        focused || FiltersOpen ? 'input-border-focused' : 'input-border',
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
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {onClickFilters && (
        <button
          ref={buttonRef}
          onClick={onClickFilters}
          className={clsxm(
            'text',
            FiltersOpen || (focused && 'bg-surface text-color-primary'),
            'h-full rounded p-1',
          )}
        >
          <AdjustmentsIcon
            className={clsxm('text-hint', FiltersOpen && 'text-color-primary')}
          />
        </button>
      )}
    </div>
  );
}
