import React from 'react';

import { FILTER_CATEGORIES, FilterCategory } from '@/api/tags';
import { useClearFilters } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import { FiltersMenuProps } from '@/modules/search';
import { SolidButton } from '@/ui/components';
import { useSelections } from '@/ui/hooks/useSelections';

import { FilterSection } from './FilterSection';

export function FiltersSidebar({ isOpen }: FiltersMenuProps) {
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
      <div>
        {FILTER_CATEGORIES.map((category) => (
          <FilterSection
            key={category}
            category={category}
            isExpanded={getIsExpanded(category)}
            onToggle={handleToggleCategory(category)}
            onClear={clearFilters.handleClearCategory(category)}
          />
        ))}
      </div>
    </div>
  );
}
