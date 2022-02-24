import { useState } from 'react';

import { FilterType, getFilterTypes } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { Popover } from '@/ui/components';
import { clsxm } from '@/ui/utils';

import { CategoryFilterMultiSelect } from './CategoryFilterMultiSelect';
import { FilterTypeMenuButton } from './FilterTypeMenuButton';

export function MobileFilterBar({ className }: { className?: string }) {
  const [selectedFilterType, setSelectedFilterType] =
    useState<FilterType | null>(null);

  const selectFilterType = (type: FilterType) => setSelectedFilterType(type);

  const onRequestClose = () => setSelectedFilterType(null);

  const { search } = useSearch();

  const tags = search.tags ?? [];

  const getCountForType = (type: FilterType): number => {
    return tags.filter((tag) => tag.type === type).length;
  };

  return (
    <>
      <ul
        className={clsxm('flex items-center gap-2 overflow-x-auto', className)}
      >
        {getFilterTypes()
          .sort((a, b) => getCountForType(b) - getCountForType(a))
          .map((type) => (
            <li key={type}>
              <FilterTypeMenuButton type={type} onClick={selectFilterType} />
            </li>
          ))}
      </ul>
      {selectedFilterType && (
        <Popover
          className="bg-surface fixed top-0 left-0 min-w-full max-w-fit rounded-none px-2 py-3"
          onRequestClose={onRequestClose}
          isOpen={Boolean(selectedFilterType)}
        >
          <CategoryFilterMultiSelect
            type={selectedFilterType}
            onRequestClose={onRequestClose}
          />
        </Popover>
      )}
    </>
  );
}
