import { capitalizeFirst } from '@/lib/capitalizeFirst';

import { ContentTag, groupTagsByType, TAG_TYPE_TO_PLURAL } from '../tags';
import { useSearch } from './SearchContext';

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
            <div className="px-4">
              <span className="text-lg font-semibold">
                {capitalizeFirst(TAG_TYPE_TO_PLURAL[type])}
              </span>
              <ul>
                {list.map((tag) => (
                  <li className="w-full" key={tag.name}>
                    <button
                      className="w-full py-3 text-left"
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
