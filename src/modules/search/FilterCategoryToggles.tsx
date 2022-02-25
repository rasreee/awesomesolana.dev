import React from 'react';

import { FILTER_CATEGORIES, FilterCategory } from '@/api/tags';

import { FilterCategoryToggleBlock } from './FilterCategoryToggleBlock';

export function FilterCategoryToggles({
  getIsExpanded,
  onToggle,
  onClear,
}: {
  getIsExpanded: (item: FilterCategory) => boolean;
  onToggle: (item: FilterCategory) => () => void;
  onClear: (item: FilterCategory) => () => void;
}) {
  return (
    <ul>
      {FILTER_CATEGORIES.map((item) => (
        <li key={item}>
          <FilterCategoryToggleBlock
            category={item}
            isExpanded={getIsExpanded(item)}
            onToggle={onToggle(item)}
            onClear={onClear(item)}
          />
        </li>
      ))}
    </ul>
  );
}
