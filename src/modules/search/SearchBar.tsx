import { useState } from 'react';

import { Popover } from '@/ui/components';

import { ContentTag, searchTags } from '../tags';
import { GroupedSearchMenu } from './GroupedSearchMenu';
import { useSearch } from './SearchContext';
import { SearchForm } from './SearchForm';

export function SearchBar() {
  const { addTag } = useSearch();

  const [value, setValue] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredTags, setFilteredTags] = useState<ContentTag[]>([]);

  const closePopover = () => {
    setFilteredTags([]);
  };

  const submitQuery = async (searchQuery: string) => {
    setError(null);
    setIsRequesting(true);
    try {
      const result = await searchTags(searchQuery);
      setFilteredTags(result);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError(e.message);
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const onTagClick = (tag: ContentTag) => {
    addTag(tag);
    closePopover();
    setValue('');
  };

  return (
    <>
      <SearchForm
        value={value}
        onChange={setValue}
        error={error}
        isRequesting={isRequesting}
        onSubmit={submitQuery}
      />
      <Popover
        className="bg-surface"
        isOpen={filteredTags.length > 0 && !isRequesting}
        onRequestClose={closePopover}
      >
        <GroupedSearchMenu tags={filteredTags} onTagClick={onTagClick} />
      </Popover>
    </>
  );
}
