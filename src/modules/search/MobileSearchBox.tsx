import { useState } from 'react';

import { ErrorMessage, Popover, TextInput } from '@/ui/components';
import { AdjustmentsIcon } from '@/ui/icon/AdjustmentsIcon';

import { FiltersMenu } from './Filters';
import { SearchBoxProps } from './SearchBox';
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
    <div className="mx-8 flex flex-col gap-2">
      <div className="bg-surface flex items-center gap-1 rounded-xl px-5 py-2">
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
      <Popover
        className="bg-surface relative w-full"
        isOpen={filtersMenuOpen}
        onRequestClose={toggleFiltersMenu}
      >
        <FiltersMenu />
      </Popover>
    </div>
  );
}
