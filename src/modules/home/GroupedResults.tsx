import { FILTER_CATEGORIES, FilterCategory, Tag } from '@modules/tags';
import { capitalize } from '@utils/capitalize';
import pluralize from '@utils/pluralize';

import { useSearchState } from '@/hooks/useSearchState';
import { Popover } from '@/ui/components';

type GroupedResultsProps = {
  isOpen: boolean;
  hits: Tag[];
  onAddFilter: (tag: Tag) => void;
  onClose: () => void;
};

type GroupedHits = Array<{ category: FilterCategory; hits: Tag[] }>;

function groupByCategory(list: Tag[]): GroupedHits {
  const groups = FILTER_CATEGORIES.map((category) => ({
    category,
    hits: list.filter((filter) => filter.category === category),
  }));

  return groups;
}

export function GroupedResults({
  isOpen,
  hits,
  onAddFilter: handleTagClick,
  onClose,
}: GroupedResultsProps) {
  const { filters: searchFilters } = useSearchState();

  const listToShow = hits.filter(
    (hit) => !searchFilters.some((filter) => filter.name === hit.name),
  );

  const onAddFilter = (tag: Tag) => () => {
    handleTagClick(tag);
  };

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      isOpen={isOpen}
      onClose={onClose}
    >
      {groupByCategory(listToShow).map(
        ({ category, hits: list }) =>
          list.length > 0 && (
            <div className="flex flex-col gap-2 px-1">
              <span className="px-3 py-2 text-lg font-semibold">
                {capitalize(pluralize(category))} {`(${list.length})`}
              </span>
              <ul className="max-h-[16rem] overflow-y-auto">
                {list.map((hit) => (
                  <li className="w-full" key={hit.name}>
                    <button
                      className="hover:bg-surface-1 w-full rounded-md py-3 px-3 text-left"
                      onClick={onAddFilter(hit)}
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
