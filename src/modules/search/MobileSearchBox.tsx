import { useRouter } from 'next/router';
import { useState } from 'react';

import { TAG_TYPES } from '@/data/tags';
import { ErrorMessage, Popover, TextInput } from '@/ui/components';
import { AdjustmentsIcon } from '@/ui/icon/AdjustmentsIcon';
import { XIcon } from '@/ui/icon/XIcon';

import { FilterSection } from './Filters';
import { SearchBoxProps } from './SearchBox';
import { useSearch } from './SearchContext';
import { StatefulSearchIcon } from './StatefulSearchIcon';

const DEFAULT_PLACEHOLDER = 'Search for any project, dependency, or topic';

export function MobileSearchBox({
  value,
  onChange,
  isRequesting,
  error,
}: SearchBoxProps) {
  const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);

  const toggleFiltersMenu = () => setFiltersMenuOpen((prev) => !prev);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-surface flex w-full items-center gap-1 rounded-xl px-5 py-2">
        <ErrorMessage>{error}</ErrorMessage>
        <StatefulSearchIcon isRequesting={isRequesting} />
        <TextInput
          type="search"
          name="search"
          placeholder={DEFAULT_PLACEHOLDER}
          value={value}
          onChange={onChange}
        />
        <button onClick={toggleFiltersMenu}>
          <AdjustmentsIcon />
        </button>
      </div>
      <MobileFiltersMenu
        isOpen={filtersMenuOpen}
        onRequestClose={toggleFiltersMenu}
      />
    </div>
  );
}

function MobileFiltersMenu({
  isOpen,
  onRequestClose,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
}) {
  const router = useRouter();
  const { search } = useSearch();

  const selectedCount = search.tags?.length ?? 0;

  const clearFilters = () => router.push('/search');

  return (
    <Popover
      className="bg-surface relative w-full"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="flex flex-col gap-2 py-3">
        <div className="flex items-center justify-between px-5">
          <div className="text-lg font-semibold">Filters</div>
          <div className="flex items-center gap-5">
            {selectedCount > 0 && (
              <button
                onClick={clearFilters}
                className="active:bg-surface-1 rounded-md px-2 py-1 text-sm font-medium transition-all"
              >
                Clear all filters
              </button>
            )}
            <button onClick={onRequestClose}>
              <XIcon />
            </button>
          </div>
        </div>
        <div>
          {TAG_TYPES.map((type) => (
            <FilterSection type={type} key={type} />
          ))}
        </div>
      </div>
    </Popover>
  );
}
