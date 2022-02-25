import React, { useState } from 'react';

import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { FILTER_CATEGORIES, FilterCategory } from '@/api/tags';
import { capitalizeFirst } from '@/common/utils';
import { useSearchFilters } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { ChevronDownIcon } from '@/ui/icons';

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
      <ul className="grid grid-cols-2 gap-2 overflow-x-auto">
        {FILTER_CATEGORIES.map((name) => (
          <li key={name}>
            <FilterItemToggle name={name} />
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
        'py-2 px-3',
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

export function FilterItemToggle({ name }: { name: FilterCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <TagButton
        onClick={() => setIsExpanded(true)}
        className={clsxm(
          isExpanded ? 'bg-color-primary text-white' : '',
          'mb-2',
        )}
      >
        <span className="text-base leading-none">
          {capitalizeFirst(pluralize(name))}
        </span>
        <ChevronDownIcon />
      </TagButton>
      <CategoryFilters
        category={name}
        isOpen={isExpanded}
        onRequestClose={() => setIsExpanded(false)}
      />
    </>
  );
}
