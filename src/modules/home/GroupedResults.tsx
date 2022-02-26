import { Tag, TAG_TYPES, TagType } from '@modules/tags';
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

type GroupedHits = Array<{ type: TagType; hits: Tag[] }>;

function groupByCategory(list: Tag[]): GroupedHits {
  const groups = TAG_TYPES.map((type) => ({
    type,
    hits: list.filter((filter) => filter.type === type),
  }));

  return groups;
}

export function GroupedResults({
  isOpen,
  hits,
  onAddFilter: handleTagClick,
  onClose,
}: GroupedResultsProps) {
  const { tags: searchFilters } = useSearchState();

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
        ({ type, hits: list }) =>
          list.length > 0 && (
            <div className="flex flex-col gap-2 px-1" key={type}>
              <span className="px-3 py-2 text-lg font-semibold">
                {capitalize(pluralize(type))} {`(${list.length})`}
              </span>
              <ul className="max-h-[16rem] overflow-y-auto">
                {list.map((hit) => (
                  <li className="w-full" key={`${hit.type}_${hit.name}`}>
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
