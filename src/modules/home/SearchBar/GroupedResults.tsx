import React from 'react';

import {
  FilterCategory,
  getFilterCategories,
  Tag,
  toPluralFilterCategory,
} from '@/api/tags';
import { useSearch } from '@/contexts/SearchContext';
import { Popover } from '@/ui/components';

type GroupedResultsProps = {
  isOpen: boolean;
  hits: Tag[];
  onFilterClick: (tag: Tag) => void;
  onRequestClose: () => void;
};

type GroupedHits = Array<{ category: FilterCategory; hits: Tag[] }>;

function groupHitsByType(list: Tag[]): GroupedHits {
  const groups = getFilterCategories().map((category) => ({
    category,
    hits: list.filter((filter) => filter.category === category),
  }));

  return groups;
}

export function GroupedResults({
  isOpen,
  hits,
  onFilterClick: handleTagClick,
  onRequestClose,
}: GroupedResultsProps) {
  const { search } = useSearch();

  const listToShow = hits.filter(
    (hit) => !search.tags?.some((filter) => filter.name === hit.name),
  );

  const onFilterClick = (tag: Tag) => () => {
    handleTagClick(tag);
  };

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      {groupHitsByType(listToShow).map(
        ({ category, hits: list }) =>
          list.length > 0 && (
            <div className="flex flex-col gap-2 px-1">
              <span className="px-3 py-2 text-lg font-semibold">
                {toPluralFilterCategory(category)} {`(${list.length})`}
              </span>
              <ul className="max-h-[16rem] overflow-y-auto">
                {list.map((hit) => (
                  <li className="w-full" key={hit.name}>
                    <button
                      className="hover:bg-surface-1 w-full rounded-md py-3 px-3 text-left"
                      onClick={onFilterClick(hit)}
                    >
                      {hit.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ),
      )}
    </Popover>
  );
}
