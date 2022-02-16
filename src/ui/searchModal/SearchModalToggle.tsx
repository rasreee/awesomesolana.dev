import clsxm from '@/lib/clsxm';

import { KbdSymbols } from './kbdSymbols';
import { useSearchModal } from './SearchModalContext';

const SearchModalToggle = ({ className }: { className?: string }) => {
  const searchModal = useSearchModal();

  return (
    <button
      className={clsxm(
        'font-medium',
        'px-4 py-2',
        'flex items-center justify-between gap-5 rounded-md',
        'bg-base-50 text-gray-500 dark:bg-base-800 dark:text-gray-300',
        'text-sm',
        className,
      )}
      onClick={searchModal.onRequestOpen}
    >
      <span>Quick search...</span>
      <kbd
        className={clsxm(
          'inline-flex items-center gap-0.5 px-2 py-1 font-serif',
          'rounded border border-base-200 bg-base-200 text-gray-600 opacity-70 dark:border-base-700 dark:bg-transparent dark:text-gray-300',
        )}
      >
        <span>{KbdSymbols.CMD}</span>
        <span>K</span>
      </kbd>
    </button>
  );
};

export default SearchModalToggle;
