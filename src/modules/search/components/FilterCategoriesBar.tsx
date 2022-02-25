import { createContext, useContext, useState } from 'react';

import { FILTER_CATEGORIES, FilterCategory } from '@/modules/tags';
import { ResponsiveRender } from '@/ui/components';

import { FilterCategoryMenuBottomSheet } from './FilterCategoryMenuBottomSheet';
import { FilterCategoryMenuDropdown } from './FilterCategoryMenuDropdown';
import { FilterItemToggle } from './FilterItemToggle';
import { CategoryFiltersProps } from './types';

export const FilterCategoriesBarContext = createContext<
  Omit<CategoryFiltersProps, 'category'> & { category: FilterCategory | null }
>({} as CategoryFiltersProps);

export function FilterCategoriesBar({ children }: { children: any }) {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory | null>(null);

  const onRequestCloseCategory = () => {
    setSelectedCategory(null);
  };

  const expandCategory = (filterCategory: FilterCategory) => {
    setSelectedCategory(filterCategory);
  };

  return (
    <FilterCategoriesBarContext.Provider
      value={{
        category: selectedCategory,
        onRequestClose: onRequestCloseCategory,
        expand: expandCategory,
      }}
    >
      {children}
    </FilterCategoriesBarContext.Provider>
  );
}
export function useFilterCategoriesBar() {
  return useContext(FilterCategoriesBarContext);
}

export function FilterCategoriesControls() {
  return (
    <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
      {FILTER_CATEGORIES.map((name) => (
        <li key={name}>
          <FilterItemToggle category={name} />
        </li>
      ))}
    </ul>
  );
}

export function FilterCategoryMenu() {
  const { category, onRequestClose, expand } = useFilterCategoriesBar();

  if (!category) return null;

  return (
    <ResponsiveRender
      mobile={FilterCategoryMenuBottomSheet}
      aboveMobile={FilterCategoryMenuDropdown}
      props={{ category, onRequestClose, expand }}
    />
  );
}
