import {
  getFilterTypes,
  SearchFilter,
  toPluralFilterType,
} from '@/api/filters';
import { useSearch } from '@/contexts/search';

type GroupedSearchMenuProps = {
  tags: SearchFilter[];
  onFilterClick: (tag: SearchFilter) => void;
};

type GroupedTags = Array<{ type: SearchFilter['type']; tags: SearchFilter[] }>;

function groupTagsByType(list: SearchFilter[]): GroupedTags {
  const groups = getFilterTypes().map((type) => ({
    type,
    tags: list.filter((filter) => filter.type === type),
  }));

  return groups;
}

export function GroupedSearchMenu({
  tags,
  onFilterClick: handleTagClick,
}: GroupedSearchMenuProps) {
  const { search } = useSearch();

  const tagsToShow = tags.filter(
    (tag) =>
      !search.tags?.map((selectedTag) => selectedTag.name).includes(tag.name),
  );

  const onFilterClick = (tag: SearchFilter) => () => {
    handleTagClick(tag);
  };

  return (
    <>
      {groupTagsByType(tagsToShow).map(
        ({ type, tags: list }) =>
          list.length > 0 && (
            <div className="flex flex-col gap-2 px-1">
              <span className="px-3 py-2 text-lg font-semibold">
                {toPluralFilterType(type)} {`(${list.length})`}
              </span>
              <ul className="max-h-[16rem] overflow-y-auto">
                {list.map((tag) => (
                  <li className="w-full" key={tag.name}>
                    <button
                      className="hover:bg-surface-1 w-full rounded-md py-3 px-3 text-left"
                      onClick={onFilterClick(tag)}
                    >
                      {tag.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ),
      )}
    </>
  );
}
