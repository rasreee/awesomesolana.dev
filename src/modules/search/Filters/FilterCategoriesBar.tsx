import { FILTER_CATEGORIES, FilterCategory } from '@modules/tags';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { normalizeQueryParam } from '@/utils';

import { FilterItemToggle } from './FilterItemToggle';

export function useFilterCategoriesBar() {
  const router = useRouter();
  const selectedCategory = useMemo(
    () =>
      router.asPath.includes('/filters?category=') && 'category' in router.query
        ? normalizeQueryParam<FilterCategory>(router.query.category)
        : null,
    [router.query, router.asPath],
  );

  const onCloseCategory = () => {
    router.back();
  };

  const expandCategory = (filterCategory: FilterCategory) => {
    router.push(`/search/filters?category=${filterCategory}`, undefined, {
      shallow: true,
    });
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
