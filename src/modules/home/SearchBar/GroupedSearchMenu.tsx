import {
  FilterCategory,
  getFilterCategories,
  SearchFilter,
  toPluralFilterCategory,
} from '@/api/filters';
import { useSearch } from '@/contexts/search';

type GroupedSearchMenuProps = {
  tags: SearchFilter[];
  onFilterClick: (tag: SearchFilter) => void;
};

type GroupedTags = Array<{ category: FilterCategory; tags: SearchFilter[] }>;

function groupTagsByType(list: SearchFilter[]): GroupedTags {
  const groups = getFilterCategories().map((category) => ({
    category,
    tags: list.filter((filter) => filter.category === category),
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
        ({ category, tags: list }) =>
          list.length > 0 && (
            <div className="flex flex-col gap-2 px-1">
              <span className="px-3 py-2 text-lg font-semibold">
                {toPluralFilterCategory(category)} {`(${list.length})`}
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
