import { FILTER_CATEGORIES, FilterCategory } from '@modules/tags';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { searchRoute } from '@/utils/search-route';

import { FilterItemToggle } from './FilterItemToggle';

type UseFilterCategoriesBar = {
  category: FilterCategory | null;
  onClose: () => void;
  expand: (category: FilterCategory) => void;
};

export function useFilterCategoriesBar(): UseFilterCategoriesBar {
  const router = useRouter();
  const selectedCategory = useMemo(
    () => searchRoute.filters.categoryParam(router.asPath),
    [router.query, router.asPath],
  );

  const onCloseCategory = () => {
    router.back();
  };

  const expandCategory = (category: FilterCategory) => {
    router.push(
      searchRoute.filters.categoryUrl(router.asPath, category),
      undefined,
      {
        shallow: true,
      },
    );
  };

  return {
    category: selectedCategory,
    onClose: onCloseCategory,
    expand: expandCategory,
  };
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
