import { useEffect, useState } from 'react';

import { capitalizeFirst } from '@/lib/capitalizeFirst';
import { waitFor } from '@/lib/waitFor';
import {
  ContentTag,
  searchTags,
  TAG_TYPE_TO_PLURAL,
  tagsByType,
} from '@/modules/tags';
import {
  ErrorMessage,
  Popover,
  SearchInput,
  StatefulSearchIcon,
} from '@/ui/components';

import { useSearch } from './SearchContext';

const PLACEHOLDER_TEXT = 'Search for any project, dependency, or topic';

export const SearchBar = () => {
  const { search, addTag } = useSearch();

  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState('');

  const [tags, setTags] = useState<ContentTag[]>([]);

  const closePopover = () => {
    setTags([]);
  };

  useEffect(() => {
    const runSearch = async (searchQuery: string) => {
      await waitFor(300);
      setError(null);
      setIsRequesting(true);
      try {
        const result = await searchTags(searchQuery);
        setTags(result);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
          setError(e.message);
        }
      } finally {
        setIsRequesting(false);
      }
    };

    runSearch(value);
  }, [value]);

  const onTagClick = (tag: ContentTag) => () => {
    addTag(tag);
    closePopover();
    setValue('');
  };

  const tagsToShow = tags.filter(
    (tag) =>
      !search.tags?.map((selectedTag) => selectedTag.name).includes(tag.name),
  );

  const groupedTags: Array<{ type: ContentTag['type']; tags: ContentTag[] }> = [
    { type: 'dependency', tags: tagsByType(tagsToShow, 'dependency') },
    { type: 'topic', tags: tagsByType(tagsToShow, 'topic') },
  ];

  return (
    <div>
      <div className="flex items-center gap-1 px-5 py-2">
        <ErrorMessage>{error}</ErrorMessage>
        <StatefulSearchIcon isRequesting={isRequesting} />
        <SearchInput
          placeholder={PLACEHOLDER_TEXT}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </div>
      <Popover
        className="bg-surface mx-8"
        isOpen={tags.length > 0 && !isRequesting}
        onRequestClose={closePopover}
      >
        {groupedTags.map(
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
      </Popover>
    </div>
  );
};
