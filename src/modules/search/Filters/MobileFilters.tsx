import { useEffect, useState } from 'react';

import { FilterType, getFilterTypes } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { GhostButton } from '@/ui/components';
import { XIcon } from '@/ui/icons';

import { FilterSection } from './FilterSection';

export function MobileFilters({
  onRequestClose,
}: {
  onRequestClose: () => void;
}) {
  const { clearFilters, search, getFiltersCountByType } = useSearch();

  const [expanded, setExpanded] = useState<FilterType | null>(null);
  const [wasCleared, setWasCleared] = useState(false);

  const toggleExpanded = (item: FilterType) => {
    setExpanded((prev) => (prev !== item ? item : null));
    setWasCleared(false);
  };

  const handleClear = () => {
    clearFilters();
    setWasCleared(true);
  };

  useEffect(() => {
    if (!expanded || !wasCleared) return;

    if (getFiltersCountByType(expanded) === 0) {
      setExpanded(null);
    }
  }, [expanded, getFiltersCountByType, wasCleared]);

  return (
    <>
      <div className="flex flex-col gap-2 py-3">
        <div className="flex items-center justify-between px-5">
          <div className="text-lg font-semibold">Filters</div>
          <div className="flex items-center gap-5">
            <button onClick={onRequestClose}>
              <XIcon />
            </button>
          </div>
        </div>
        <FilterTypes
          getIsExpanded={(item) => expanded !== null && item === expanded}
          toggleExpanded={toggleExpanded}
        />
        <div className="flex items-center justify-around px-5 py-1">
          <GhostButton onClick={handleClear} disabled={!search.tags?.length}>
            Clear
          </GhostButton>
          <GhostButton className="text-color-primary" onClick={onRequestClose}>
            Done
          </GhostButton>
        </div>
      </div>
    </>
  );
}

export const FilterTypes = ({
  getIsExpanded,
  toggleExpanded,
}: {
  getIsExpanded: (item: FilterType) => boolean;
  toggleExpanded: (item: FilterType) => void;
}) => {
  return (
    <ul>
      {getFilterTypes().map((item) => (
        <li key={item}>
          <FilterSection
            type={item}
            isExpanded={getIsExpanded(item)}
            onToggleExpanded={toggleExpanded}
          />
        </li>
      ))}
    </ul>
  );
};
