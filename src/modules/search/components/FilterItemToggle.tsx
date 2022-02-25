import React, { useState } from 'react';

import { FilterCategory, getCategoryFilters } from '@/api/tags';
import { capitalizeFirst, getIntersection } from '@/common/utils';
import { useClearFilters, useSearchFilters } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { ChevronDownIcon, XIcon } from '@/ui/icons';

import { CategoryFilters } from './CategoryFilters';

export function TagButton({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
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
        className={clsxm(
          isExpanded || selectedList.length > 0
            ? 'bg-color-primary text-white'
            : '',
        )}
      >
        <div
          className="flex flex-1 cursor-pointer items-center gap-1.5"
          onClick={() => setIsExpanded(true)}
        >
          <span className="text-left text-base leading-none">
            {capitalizeFirst(pluralize(category))}
          </span>
          {selectedList.length > 0 ? (
            <span className="text-base leading-none">
              {`(${selectedList.length})`}
            </span>
          ) : null}
        </div>
        {selectedList.length > 0 ? (
          <button onClick={clearFilters.handleClearCategory(category)}>
            <XIcon className="h-4 w-4" />
          </button>
        ) : (
          <ChevronDownIcon />
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
