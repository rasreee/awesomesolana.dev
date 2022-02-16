import clsxm from '@/lib/clsxm';

const EmptySearchResults = () => (
  <div
    className={clsxm(
      'flex flex-col items-start gap-1.5',
      'text-left',
      'text-gray-700 dark:text-base-200',
    )}
  >
    <h4 className="text-lg font-medium">No results found</h4>
    <span className="opacity-70">
      We can’t find anything with that term at the moment, try searching
      something else.
    </span>
  </div>
);

export default EmptySearchResults;
