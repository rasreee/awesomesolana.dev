import { FilterCategory, getCategoryFilters } from '@modules/tags';
import { getIntersection } from '@utils/array';
import { capitalize } from '@utils/capitalize';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';
import { useRouter } from 'next/router';

import { useSearchState } from '@/hooks/useSearchState';
import { ChevronDownIcon, XIcon } from '@/ui/icons';
import { route } from '@/utils/route';

import { TagButton } from './TagButton';

export function FilterItemToggle({ category }: { category: FilterCategory }) {
  const router = useRouter();
  const { filters: allFilters } = useSearchState();

  const categoryFilters = getCategoryFilters(category);

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
        onClick={() => route.search.filters.openCategory(category, router)}
      >
        <span className="text-left text-base leading-none">
          {capitalize(pluralize(category))}
        </span>
        {hasAnySelected && (
          <span className="text-base leading-none">
            {`(${selected.length})`}
          </span>
        )}
      </div>
    );
  }

  const selectedCategory = route.search.filters.getCategory(router.asPath);

  return (
    <TagButton
      className={clsxm(
        (selectedCategory && selectedCategory === category) || hasAnySelected
          ? 'bg-color-primary text-white'
          : '',
      )}
    >
      <PrefixText />
      {hasAnySelected ? (
        <button onClick={() => route.search.clearCategory(category, router)}>
          <XIcon className="h-4 w-4" />
        </button>
      ) : (
        <ChevronDownIcon />
      )}
    </TagButton>
  );
}
