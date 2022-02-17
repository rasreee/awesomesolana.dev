import classed from '@/lib/classed';
import clsxm from '@/lib/clsxm';
import { Divider } from '@/ui/divider';

import { ISearchModalContext } from './SearchModalContext';
import { SearchData } from './types';

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

function NoSearchResults() {
  return (
    <div
      className={clsxm(
        'text-left',
        'text-gray-700 dark:text-base-200',
        'flex flex-col gap-2',
      )}
    >
      <h4 className="text-lg font-medium">No results found</h4>
      <span className="opacity-70">
        We can’t find anything with that term at the moment, try searching
        something else.
      </span>
    </div>
  );
}

const SearchResults = ({
  hits,
  onSelect,
}: Pick<ISearchModalContext, 'hits' | 'onSelect'>) => {
  const handleSelect = (selectedItem: SearchData) => () =>
    onSelect(selectedItem);

  if (hits.length === 0)
    return (
      <Container className="py-6 md:py-10">
        <NoSearchResults />
      </Container>
    );

  return (
    <Container>
      <ul className="m-0 p-0">
        {hits.map((searchResult: SearchData, index) => (
          <li key={searchResult.id} className={clsxm('list-none')}>
            {index > 0 && (
              <Divider
                className={clsxm(
                  'bg-base-200 dark:bg-base-600 dark:opacity-40',
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
