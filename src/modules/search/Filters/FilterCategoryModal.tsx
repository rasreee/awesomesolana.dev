import { FilterCategory, getCategoryFilters } from '@modules/tags';
import { getIntersection } from '@utils';
import clsxm from '@utils/clsxm';

import { Popover } from '@/ui/components';

import { useSearchState } from '../useSearchState';
import { useToggleFilter } from '../useToggleFilter';
import { useFilterCategoriesBar } from './FilterCategoriesBar';
import { FilterCategoryMenu } from './FilterCategoryMenu';

export function FilterCategoryModal() {
  const { filters: allFilters } = useSearchState();

  const { category, onClose } = useFilterCategoriesBar();

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

  if (!category) return null;

  const selectedFilters = getSelectedFilters(category);

  const options = getCategoryFilters(category).filter(
    (filter) => !selectedFilters.map((item) => item.name).includes(filter.name),
  );

  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      onClose={onClose}
      isOpen={Boolean(category)}
    >
      <FilterCategoryMenu
        category={category}
        options={options}
        onClose={onClose}
        selected={selectedFilters}
        onToggleFilter={toggleFilter}
      />
    </Popover>
  );
}
