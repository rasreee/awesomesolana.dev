import { useState } from 'react';

import { ContentTag, searchTags } from '../tags';
import { useSearch } from './SearchContext';
import { SearchForm } from './SearchForm';
import { SearchMenu } from './SearchMenu';

export function SearchBar() {
  const { addTag } = useSearch();

  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<ContentTag[]>([]);

  const closePopover = () => {
    setTags([]);
  };

  const submitQuery = async (searchQuery: string) => {
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

  return (
    <>
      <SearchForm
        error={error}
        isRequesting={isRequesting}
        onSubmit={submitQuery}
      />
      <SearchMenu
        isOpen={tags.length > 0 && !isRequesting}
        onRequestClose={closePopover}
        onTagClick={addTag}
      />
    </>
  );
}
