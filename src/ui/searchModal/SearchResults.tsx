import EmptySearchResults from './EmptySearchResults';
import { useSearchModal } from './SearchModalContext';
import SearchResult from './SearchResult';
import { SearchResultData } from './types';

const SearchResults = () => {
  const { hits, onSelect, isRequesting } = useSearchModal();

  const handleSelect = (selectedItem: SearchResultData) => () =>
    onSelect(selectedItem);

  if (isRequesting) return null;

  if (hits.length === 0) return <EmptySearchResults />;

  return (
    <ul className="m-0 p-0">
      {hits.map((searchResult: SearchResultData) => (
        <li
          key={searchResult.id}
          className={'list-none border-t border-base-200 dark:border-base-400'}
        >
          <SearchResult
            key={searchResult.id}
            onClick={handleSelect(searchResult)}
          >
            {searchResult.title}
          </SearchResult>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
