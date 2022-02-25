import { useEffect, useState } from 'react';

import { useSearchOptions } from '@/contexts/AppContext';
import clsxm from '@/lib/clsxm';
import {
  useClearFilters,
  useCountFilters,
  useSearchFilters,
} from '@/modules/search';
import { FilterCategory } from '@/modules/tags';
import { GhostButton, Popover } from '@/ui/components';
import { XIcon } from '@/ui/icons';

import { OptionCategoryToggles } from './OptionCategoryToggles';

export function SearchOptionsModal() {
  const { isOpen, onRequestClose } = useSearchOptions();
  const searchFilters = useSearchFilters();
  const clearFilters = useClearFilters();
  const countFilters = useCountFilters();

  const [expanded, setExpanded] = useState<FilterCategory | null>(null);
  const [wasCleared, setWasCleared] = useState(false);

  const handleToggleCategory = (item: FilterCategory) => () => {
    setExpanded((prev) => (prev !== item ? item : null));
    setWasCleared(false);
  };

  const handleClearAll = () => {
    clearFilters.all();
    setWasCleared(true);
  };

  useEffect(() => {
    if (!expanded || !wasCleared) return;

    if (!countFilters(expanded)) {
      setExpanded(null);
    }
  }, [expanded, countFilters, wasCleared]);

  const getIsCategoryExpanded = (item: FilterCategory) => item === expanded;

  const handleClearCategory = (category: FilterCategory) => () => {
    clearFilters.category(category);
    setExpanded(null);
  };

  return (
    <Popover
      className={clsxm(
        'bg-surface',
        'fixed top-20 bottom-20 right-5 left-5 my-auto min-h-[60vh] max-w-full flex-1',
      )}
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
        <OptionCategoryToggles
          getIsExpanded={getIsCategoryExpanded}
          onToggle={handleToggleCategory}
          onClear={handleClearCategory}
        />
        <div className="flex items-center justify-around px-5 py-1">
          <GhostButton
            onClick={handleClearAll}
            disabled={!searchFilters.length}
          >
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
