import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { waitFor } from '@/lib/waitFor';
import { ErrorMessage } from '@/ui/ErrorMessage';
import { Popover } from '@/ui/popover';
import { SearchInput } from '@/ui/SearchInput';
import { StatefulSearchIcon } from '@/ui/StatefulSearchIcon';

import { searchTags, Tag } from './tags';

const PLACEHOLDER_TEXT = 'Search for any project, dependency, or topic';

export const SearchBar = () => {
  const router = useRouter();

  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState('');

  const [tags, setTags] = useState<Tag[]>([]);

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

  const onClickTag = (tag: Tag) => () => {
    router.push(`search?tags=${tag.name}`);
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
        onRequestClose={() => setTags([])}
      >
        <ul>
          {tags.map((tag) => (
            <li key={tag.name}>
              <button
                className="w-full py-2 px-4 text-left"
                onClick={onClickTag(tag)}
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
