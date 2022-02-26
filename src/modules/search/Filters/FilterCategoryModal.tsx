import { FilterCategory, getCategoryFilters } from '@modules/tags';
import { getIntersection } from '@utils';
import clsxm from '@utils/clsxm';
import { useRouter } from 'next/router';

import { useSearchState } from '@/hooks/useSearchState';
import { useToggleFilter } from '@/hooks/useToggleFilter';
import { Popover } from '@/ui/components';
import { route } from '@/utils/route';

import { FilterCategoryMenu } from './FilterCategoryMenu';

export function FilterCategoryModal() {
  const router = useRouter();
  const selectedCategory = route.search.filters.getCategory(router.asPath);

  const { filters: allFilters } = useSearchState();

  const toggleFilter = useToggleFilter();

  const getSelectedFilters = (category: FilterCategory) => {
    const categoryFilters = getCategoryFilters(category);

    const selected = getIntersection(
      categoryFilters,
      allFilters,
      (a, b) => a.name === b.name,
    );

    return selected;
  };

  if (!selectedCategory) return null;

  const selectedFilters = getSelectedFilters(selectedCategory);

  const options = getCategoryFilters(selectedCategory).filter(
    (filter) => !selectedFilters.map((item) => item.name).includes(filter.name),
  );

  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      onClose={() => route.search.filters.closeCategory(router)}
      isOpen={Boolean(selectedCategory)}
    >
      <FilterCategoryMenu
        category={selectedCategory}
        options={options}
        onClose={() => route.search.filters.closeCategory(router)}
        selected={selectedFilters}
        onToggleFilter={toggleFilter}
      />
    </Popover>
  );
}
