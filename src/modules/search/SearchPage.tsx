import { useState } from 'react';

import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import {
  FILTER_CATEGORIES,
  FilterCategory,
  getCategoryFilters,
} from '@/api/tags';
import { capitalizeFirst, getIntersection } from '@/common/utils';
import { useClearFilters, useSearchFilters } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { XIcon } from '@/ui/icons';

import { CategoryFilters } from './CategoryFilters';
import { Results, SearchField, useSearchField } from './components';

export function SearchPage() {
  const searchFilters = useSearchFilters();

  async function searchProjectsByQuery(query: string): Promise<Project[]> {
    const initialResult = filterProjectsByTags(ALL_PROJECTS, searchFilters);
    const result = filterProjectsByTitle(initialResult, query);

    return result;
  }

  const searchField = useSearchField(searchProjectsByQuery);

  return (
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex flex-col gap-2">
        <SearchField autoFocused {...searchField} />
        <FilterBar />
      </div>
      <Results hits={searchField.hits} />
    </div>
  );
}

export function FilterBar() {
  return (
    <>
      <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
        {FILTER_CATEGORIES.map((name) => (
          <li key={name}>
            <FilterItemToggle category={name} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function TagButton({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={clsxm(
        'cursor-pointer',
        'py-2 px-3 sm:gap-2 sm:px-4',
        'rounded-md',
        'flex items-center justify-between',
        'min-w-max overflow-hidden',
        'font-medium',
        'flex-1',
        'bg-surface-2 text text-opacity-90',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FilterItemToggle({ category }: { category: FilterCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const allFilters = useSearchFilters();
  const categoryFilters = getCategoryFilters(category);
  const clearFilters = useClearFilters();

  const selectedList = getIntersection(
    categoryFilters,
    allFilters,
    (a, b) => a.name === b.name,
  );

  return (
    <>
      <TagButton
        onClick={() => setIsExpanded(true)}
        className={clsxm(
          isExpanded || selectedList.length > 0
            ? 'bg-color-primary text-white'
            : '',
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-left text-base leading-none">
            {capitalizeFirst(pluralize(category))}
          </span>
          {selectedList.length > 0 ? (
            <span className="text-base leading-none">
              {`(${selectedList.length})`}
            </span>
          ) : null}
        </div>
        {selectedList.length > 0 && (
          <button onClick={clearFilters.handleClearCategory(category)}>
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </TagButton>
      <CategoryFilters
        category={category}
        isOpen={isExpanded}
        onRequestClose={() => setIsExpanded(false)}
      />
    </>
  );
}
