import { Tag, tags, TagType, tagTypes } from '@core/search';
import { capitalize } from '@utils/capitalize';
import pluralize from '@utils/pluralize';

import { Popover } from '@/ui/components';

import { useSearchStore } from '../search/SearchStore';

type GroupedResultsProps = {
  isOpen: boolean;
  hits: Tag[];
  onTagClick: (tag: Tag) => void;
  onClose: () => void;
};

type GroupedHits = Array<{ type: TagType; hits: Tag[] }>;

function groupByTag(list: Tag[]): GroupedHits {
  const groups = tagTypes.map((type) => ({
    type,
    hits: list.filter((tag) => tag.type === type),
  }));

  return groups;
}

export function GroupedResults({
  isOpen,
  hits,
  onTagClick,
  onClose,
}: GroupedResultsProps) {
  const store = useSearchStore();

  const listToShow = tags.list(hits).exclude(store.tags);

  const handleTagClick = (tag: Tag) => () => {
    onTagClick(tag);
  };

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      isOpen={isOpen}
      onClose={onClose}
    >
      {groupByTag(listToShow).map(
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
                      onClick={handleTagClick(hit)}
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
