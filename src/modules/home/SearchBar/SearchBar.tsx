import { useEffect, useState } from 'react';

import { SearchFilter, searchFilters } from '@/api/filters';
import { waitFor } from '@/common/utils';
import { useSearch } from '@/contexts/search';
import {
  ErrorMessage,
  Popover,
  StatefulIcon,
  TextInput,
} from '@/ui/components';
import { SearchIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

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
        'input input-border mx-auto w-full rounded-full',
        focused && 'input-border-focused',
      )}
    >
      <div className="flex items-center gap-1 px-5 py-2">
        <ErrorMessage>{error}</ErrorMessage>
        <StatefulIcon
          label="search"
          className={clsxm({
            'text-primary': focused,
          })}
          loading={isRequesting}
          icon={SearchIcon}
        />
        <TextInput
          type="search"
          name="search"
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
