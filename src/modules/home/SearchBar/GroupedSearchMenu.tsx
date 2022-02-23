import { ContentTag, groupTagsByType, TAG_TYPE_TO_PLURAL } from '@/data/tags';
import { capitalizeFirst } from '@/lib/capitalizeFirst';
import { useSearch } from '@/modules/search';

type GroupedSearchMenuProps = {
  tags: ContentTag[];
  onTagClick: (tag: ContentTag) => void;
};

export function GroupedSearchMenu({
  tags,
  onTagClick: handleTagClick,
}: GroupedSearchMenuProps) {
  const { search } = useSearch();

  const tagsToShow = tags.filter(
    (tag) =>
      !search.tags?.map((selectedTag) => selectedTag.name).includes(tag.name),
  );

  const onTagClick = (tag: ContentTag) => () => {
    handleTagClick(tag);
  };

  return (
    <>
      {groupTagsByType(tagsToShow).map(
        ({ type, tags: list }) =>
          list.length > 0 && (
            <div className="flex flex-col gap-2 px-1">
              <span className="px-3 py-2 text-lg font-semibold">
                {capitalizeFirst(TAG_TYPE_TO_PLURAL[type])} {`(${list.length})`}
              </span>
              <ul className="max-h-[16rem] overflow-y-auto">
                {list.map((tag) => (
                  <li className="w-full" key={tag.name}>
                    <button
                      className="hover:bg-surface-1 w-full rounded-md py-3 px-3 text-left"
                      onClick={onTagClick(tag)}
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
