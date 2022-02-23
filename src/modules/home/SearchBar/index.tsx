import { useState } from 'react';

import { ContentTag, searchTags } from '@/data/tags';
import { useSearch } from '@/modules/search';
import { Popover } from '@/ui/components';

import { GroupedSearchMenu } from './GroupedSearchMenu';
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
      const result = searchTags(searchQuery);
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
        className="bg-surface overflow-hidden py-5 px-3"
        isOpen={filteredTags.length > 0 && !isRequesting}
        onRequestClose={closePopover}
      >
        <GroupedSearchMenu tags={filteredTags} onTagClick={onTagClick} />
      </Popover>
    </>
  );
}
