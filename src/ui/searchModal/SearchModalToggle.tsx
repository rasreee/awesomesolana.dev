import clsxm from '@/lib/clsxm';

import { KbdSymbols } from './kbdSymbols';
import { useSearchModal } from './SearchModalContext';

const SearchModalToggle = () => {
  const searchModal = useSearchModal();

  return (
    <button
      className={clsxm(
        'text-medium',
        'flex min-w-[12rem] items-center justify-between gap-5 rounded-md px-7 py-1.5',
        'bg-base-200 text-gray-500 dark:bg-base-800 dark:text-gray-300',
        'text-sm',
      )}
      onClick={searchModal.onRequestOpen}
    >
      <span>Quick search...</span>
      <kbd
        className={clsxm(
          'inline-flex items-center gap-0.5 px-2 py-1 font-serif',
          'rounded border border-base-100 text-gray-500 dark:border-base-700 dark:text-gray-300',
          'bg-transparent',
        )}
      >
        <span>{KbdSymbols.CMD}</span>
        <span>K</span>
      </kbd>
    </button>
  );
};

export default SearchModalToggle;
