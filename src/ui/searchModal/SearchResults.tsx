import classed from '@/lib/classed';
import clsxm from '@/lib/clsxm';

import EmptySearchResults from './EmptySearchResults';
import { useSearchModal } from './SearchModalContext';
import { SearchResultData } from './types';

const Container = classed('div', 'px-10 py-3');

const Button = classed(
  'button',
  'w-full',
  'px-3 py-5',
  'text-left leading-none',
  'text-gray-800 dark:text-base-300',
  'transition',
  'hover:bg-gray-50 dark:rounded dark:hover:bg-transparent dark:border dark:border-transparent dark:hover:border-base-500 dark:active:bg-base-600',
);

const SearchResults = () => {
  const { hits, onSelect, isRequesting } = useSearchModal();

  const handleSelect = (selectedItem: SearchResultData) => () =>
    onSelect(selectedItem);

  if (isRequesting) return null;

  if (hits.length === 0)
    return (
      <Container className="py-6">
        <EmptySearchResults />
      </Container>
    );

  return (
    <Container>
      <ul className="m-0 p-0">
        {hits.map((searchResult: SearchResultData, index) => (
          <li key={searchResult.id} className={clsxm('list-none')}>
            {index > 0 && (
              <div
                className={clsxm(
                  'bg-base-200 dark:bg-base-600 dark:opacity-40',
                  'h-[1px]',
                )}
              />
            )}
            <Button key={searchResult.id} onClick={handleSelect(searchResult)}>
              {searchResult.title}
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default SearchResults;
