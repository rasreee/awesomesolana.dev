import React from 'react';

import { useSearchOptions } from '@/contexts/AppContext';
import { useClearFilters } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import { FILTER_CATEGORIES, FilterCategory } from '@/modules/tags';
import { SolidButton } from '@/ui/components';
import { useSelections } from '@/ui/hooks/useSelections';

import { OptionCategoryToggles } from './OptionCategoryToggles';

export function SearchOptionsSidebar() {
  const { isOpen } = useSearchOptions();

  const { getIsExpanded, toggleSelection } =
    useSelections<FilterCategory>(FILTER_CATEGORIES);

  const clearFilters = useClearFilters();

  const handleToggleCategory = (category: FilterCategory) => () => {
    toggleSelection(category);
  };

  if (!isOpen) return null;

  return (
    <div className={clsxm('bg-surface', 'flex flex-col gap-2 py-3')}>
      <div className="flex items-center justify-between px-5">
        <div className="text-lg font-semibold">Filters</div>
        <SolidButton
          className="py-2 text-sm leading-none"
          onClick={clearFilters.all}
        >
          Clear all
        </SolidButton>
      </div>
      <OptionCategoryToggles
        getIsExpanded={getIsExpanded}
        onToggle={handleToggleCategory}
        onClear={clearFilters.handleClearCategory}
      />
    </div>
  );
}
