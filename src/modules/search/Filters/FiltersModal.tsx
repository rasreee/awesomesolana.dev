import React, { useEffect, useState } from 'react';

import { FILTER_CATEGORIES, FilterCategory } from '@/api/tags';
import { useAppState } from '@/contexts/AppContext';
import { useSearch } from '@/contexts/SearchContext';
import { GhostButton, Popover } from '@/ui/components';
import { XIcon } from '@/ui/icons';

import { FilterSection } from './FilterSection';

export function FiltersModal() {
  const {
    filtersMenu: { isOpen, onRequestClose },
  } = useAppState();
  const { clearFilters, search, getFiltersCountByType, clearFiltersByType } =
    useSearch();

  const [expanded, setExpanded] = useState<FilterCategory | null>(null);
  const [wasCleared, setWasCleared] = useState(false);

  const handleToggleCategory = (item: FilterCategory) => () => {
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

  const getIsCategoryExpanded = (item: FilterCategory) =>
    Boolean(expanded && item === expanded);

  const handleClearCategory = (category: FilterCategory) => () => {
    clearFiltersByType(category);
    setExpanded(null);
  };

  return (
    <Popover
      className="fixed top-20 bottom-20 right-5 left-5 my-auto min-h-[60vh] max-w-full flex-1"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="flex flex-col gap-2 py-3">
        <div className="flex items-center justify-between px-5">
          <div className="text-lg font-semibold">Filters</div>
          <div className="flex items-center gap-5">
            <button onClick={onRequestClose}>
              <XIcon />
            </button>
          </div>
        </div>
        <ul>
          {FILTER_CATEGORIES.map((item) => (
            <li key={item}>
              <FilterSection
                category={item}
                isExpanded={getIsCategoryExpanded(item)}
                onToggle={handleToggleCategory(item)}
                onClear={handleClearCategory(item)}
              />
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-around px-5 py-1">
          <GhostButton onClick={handleClear} disabled={!search.tags?.length}>
            Clear
          </GhostButton>
          <GhostButton className="text-color-primary" onClick={onRequestClose}>
            Done
          </GhostButton>
        </div>
      </div>
    </Popover>
  );
}
