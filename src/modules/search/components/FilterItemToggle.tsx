import { capitalizeFirst, getIntersection } from '@/common/utils';
import { useClearFilters, useSearchFilters } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { FilterCategory, getCategoryFilters } from '@/modules/tags';
import { ChevronDownIcon, XIcon } from '@/ui/icons';

import { useFilterCategoriesBar } from './FilterCategoriesBar';
import { TagButton } from './TagButton';

export function FilterItemToggle({ category }: { category: FilterCategory }) {
  const { category: selectedCategory, expand } = useFilterCategoriesBar();

  const allFilters = useSearchFilters();
  const categoryFilters = getCategoryFilters(category);
  const clearFilters = useClearFilters();

  const selected = getIntersection(
    categoryFilters,
    allFilters,
    (a, b) => a.name === b.name,
  );

  const hasAnySelected = selected.length > 0;

  function PrefixText() {
    return (
      <div
        className="flex flex-1 cursor-pointer items-center gap-1.5"
        onClick={() => expand(category)}
      >
        <span className="text-left text-base leading-none">
          {capitalizeFirst(pluralize(category))}
        </span>
        {hasAnySelected && (
          <span className="text-base leading-none">
            {`(${selected.length})`}
          </span>
        )}
      </div>
    );
  }

  function Postfix() {
    return (
      <>
        {hasAnySelected ? (
          <button onClick={clearFilters.handleClearCategory(category)}>
            <XIcon className="h-4 w-4" />
          </button>
        ) : (
          <ChevronDownIcon />
        )}
      </>
    );
  }

  return (
    <TagButton
      className={clsxm(
        (selectedCategory && selectedCategory === category) || hasAnySelected
          ? 'bg-color-primary text-white'
          : '',
      )}
    >
      <PrefixText />
      <Postfix />
    </TagButton>
  );
}
