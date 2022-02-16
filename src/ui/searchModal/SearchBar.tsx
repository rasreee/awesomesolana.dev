import { ChangeEventHandler } from 'react';
import React from 'react';

import clsxm from '@/lib/clsxm';
import Spinner from '@/ui/progress/Spinner';

import SearchIcon from './SearchIcon';
import { useSearchModal } from './SearchModalContext';

const SearchBar = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { query, setQuery, isRequesting } = useSearchModal();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setQuery(event.currentTarget.value);

  return (
    <div className={clsxm('flex items-center gap-2 px-5 py-2')}>
      {isRequesting ? (
        <Spinner />
      ) : (
        <label
          htmlFor="search"
          className={clsxm(
            'flex h-6 w-6 items-center justify-center',
            'text-base-600 dark:text-base-300',
          )}
        >
          <SearchIcon />
        </label>
      )}
      <input
        type="search"
        name="search"
        placeholder="Search"
        className={clsxm(
          'block w-full border-none leading-none',
          'bg-transparent',
          'text-base-600 dark:text-base-100 dark:placeholder:text-gray-400',
          'text-base md:text-lg',
          'focus:border-none focus:outline-none',
        )}
        value={query}
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBar;
