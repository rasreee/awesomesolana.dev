import { useState } from 'react';

import { FilterCategory, getFilterCategorys } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { Popover } from '@/ui/components';
import { clsxm } from '@/ui/utils';

import { CategoryFilterMultiSelect } from './CategoryFilterMultiSelect';
import { FilterCategoryMenuButton } from './FilterCategoryMenuButton';

export function MobileFilterBar({ className }: { className?: string }) {
  const [selectedFilterCategory, setSelectedFilterCategory] =
    useState<FilterCategory | null>(null);

  const selectFilterCategory = (category: FilterCategory) =>
    setSelectedFilterCategory(category);

  const onRequestClose = () => setSelectedFilterCategory(null);

  const { search } = useSearch();

  const tags = search.tags ?? [];

  const getCountForType = (category: FilterCategory): number => {
    return tags.filter((tag) => tag.category === category).length;
  };

  return (
    <>
      <ul
        className={clsxm('flex items-center gap-2 overflow-x-auto', className)}
      >
        {getFilterCategorys()
          .sort((a, b) => getCountForType(b) - getCountForType(a))
          .map((category) => (
            <li key={category}>
              <FilterCategoryMenuButton
                category={category}
                onClick={selectFilterCategory}
              />
            </li>
          ))}
      </ul>
      {selectedFilterCategory && (
        <Popover
          className="bg-surface fixed top-0 left-0 min-w-full max-w-fit rounded-none px-2 py-3"
          onRequestClose={onRequestClose}
          isOpen={Boolean(selectedFilterCategory)}
        >
          <CategoryFilterMultiSelect
            category={selectedFilterCategory}
            onRequestClose={onRequestClose}
          />
        </Popover>
      )}
    </>
  );
}
