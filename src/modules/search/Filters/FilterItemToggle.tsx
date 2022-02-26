import {
  FILTER_CATEGORIES,
  FilterCategory,
  getCategoryFilters,
} from '@modules/tags';
import { getIntersection } from '@utils/array';
import { capitalize } from '@utils/capitalize';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';
import { useRouter } from 'next/router';

import { ChevronDownIcon, XIcon } from '@/ui/icons';

import { useSearchState } from '../useSearchState';
import { useFilterCategoriesBar } from './FilterCategoriesBar';
import { TagButton } from './TagButton';

export function FilterItemToggle({ category }: { category: FilterCategory }) {
  const router = useRouter();
  const { filters: allFilters } = useSearchState();

  const clearCategory = (categoryToRemove: FilterCategory) => {
    const oldTags = allFilters;

    let newPath = `/search`;

    FILTER_CATEGORIES.filter(
      (category) => category !== categoryToRemove,
    ).forEach((category) => {
      const tagsForType = oldTags.filter((tag) => tag.category === category);

      if (tagsForType.length > 0) {
        const prefix = newPath === '/search' ? '?' : '&';
        newPath =
          newPath +
          prefix +
          category +
          `=${tagsForType.map((tag) => tag.name).join(',')}`;
      }
    });

    router.push(newPath);
  };

  const { category: selectedCategory, expand } = useFilterCategoriesBar();

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
        onClick={() => expand(category)}
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

  function Postfix() {
    return (
      <>
        {hasAnySelected ? (
          <button onClick={() => clearCategory(category)}>
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
