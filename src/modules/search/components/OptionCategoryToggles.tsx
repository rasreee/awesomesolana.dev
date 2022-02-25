import React from 'react';

import { FILTER_CATEGORIES, FilterCategory } from '@/modules/tags';

import { OptionCategoryToggle } from './OptionCategoryToggle';

export function OptionCategoryToggles({
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
          <OptionCategoryToggle
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
