import { useEffect, useState } from 'react';

import { SearchFilter, searchFilters } from '@/api/filters';
import clsxm from '@/lib/clsxm';
import { waitFor } from '@/lib/waitFor';
import { StatefulSearchIcon, useSearch } from '@/modules/search';
import { ErrorMessage, Popover, TextInput } from '@/ui/components';

import { GroupedSearchMenu } from './GroupedSearchMenu';

export function SearchBar() {
  const { addFilter } = useSearch();

  const [value, setValue] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedFilters, setSuggestedFilters] = useState<SearchFilter[]>([]);

  const closePopover = () => {
    setSuggestedFilters([]);
  };

  const onFilterClick = (tag: SearchFilter) => {
    addFilter(tag);
    closePopover();
    setValue('');
  };

  useEffect(() => {
    const submitQuery = async (searchQuery: string) => {
      setError(null);
      setIsRequesting(true);
      try {
        const result = searchFilters(searchQuery);
        setSuggestedFilters(result);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
          setError(e.message);
        }
      } finally {
        setIsRequesting(false);
      }
    };

    waitFor(300).then(() => submitQuery(value));
  }, [value]);

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div
      className={clsxm(
        'mx-auto w-full rounded-full border border-base-300 dark:border-base-600',
        focused && 'border-2 border-indigo-300 dark:border-indigo-500',
        'bg-surface dark:bg-opacity-60',
      )}
    >
      <div className="flex items-center gap-1 px-5 py-2">
        <ErrorMessage>{error}</ErrorMessage>
        <StatefulSearchIcon
          className={clsxm(focused && 'text-indigo-600 dark:text-indigo-400')}
          isRequesting={isRequesting}
        />
        <TextInput
          type="search"
          name="search"
          className="bg-transparent"
          placeholder={'Search for open-source projects...'}
          value={value}
          onChange={setValue}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <Popover
        className="bg-surface overflow-hidden py-5 px-3"
        isOpen={suggestedFilters.length > 0 && !isRequesting}
        onRequestClose={closePopover}
      >
        <GroupedSearchMenu
          tags={suggestedFilters}
          onFilterClick={onFilterClick}
        />
      </Popover>
    </div>
  );
}
