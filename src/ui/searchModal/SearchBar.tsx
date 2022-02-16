import { ChangeEventHandler } from 'react';

import { useInputFocus } from '@/hooks/useInputFocus';
import clsxm from '@/lib/clsxm';
import Spinner from '@/ui/progress/Spinner';

import SearchIcon from './SearchIcon';
import { useSearchModal } from './SearchModalContext';

const SearchBar = () => {
  const { query, setQuery, isRequesting } = useSearchModal();

  const { isFocused, ...bindInput } = useInputFocus(true);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setQuery(event.currentTarget.value);

  return (
    <div
      className={clsxm(
        isFocused && 'text-white',
        'flex items-center gap-2 px-5 py-3',
      )}
    >
      {isRequesting ? (
        <Spinner />
      ) : (
        <label
          htmlFor="search"
          className={clsxm('flex h-6 w-6 items-center justify-center')}
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
        )}
        value={query}
        onChange={handleChange}
        {...bindInput}
      />
    </div>
  );
};

export default SearchBar;
