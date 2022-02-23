import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { waitFor } from '@/lib/waitFor';
import {
  ErrorMessage,
  Popover,
  SearchInput,
  StatefulSearchIcon,
} from '@/ui/components';

import { useSearch } from './SearchContext';
import { searchTags, Tag } from './tags';

const PLACEHOLDER_TEXT = 'Search for any project, dependency, or topic';

export const SearchBar = () => {
  const router = useRouter();
  const { search } = useSearch();

  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState('');

  const [tags, setTags] = useState<Tag[]>([]);

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

  const addTag = (tagToAdd: Tag) => () => {
    let newPath = `/search?tags=${tagToAdd.name}`;

    const { tags: oldTags } = search;
    if (oldTags) {
      const newTags = [...oldTags, tagToAdd.name];
      newPath =
        newTags.length > 0 ? `/search?tags=${newTags.join(',')}` : `/search`;
    }

    router.push(newPath);
    closePopover();
    setValue('');
  };

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
        isOpen={tags.length > 0 && !isRequesting}
        onRequestClose={closePopover}
      >
        <ul>
          {tags
            .filter((tag) => !search.tags?.includes(tag.name))
            .map((tag) => (
              <li key={tag.name}>
                <button
                  className="w-full py-2 px-4 text-left"
                  onClick={addTag(tag)}
                >
                  {tag.name}
                </button>
              </li>
            ))}
        </ul>
      </Popover>
    </div>
  );
};
