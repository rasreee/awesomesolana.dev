import { CSSProperties } from 'react';

import clsxm from '@/lib/clsxm';

import { KbdSymbols } from './kbdSymbols';
import SearchIcon from './SearchIcon';
import { useSearchModal } from './SearchModalContext';

interface SearchModalToggleProps {
  onClick?: () => void;
  style?: CSSProperties;
}

function SearchModalToggleLarge(props: SearchModalToggleProps) {
  return (
    <button
      className={clsxm(
        'font-medium',
        'px-4 py-2',
        'flex items-center justify-between gap-5 rounded-md',
        'sm:bg-surface',
        'text-hint',
        'text-sm',
        'w-full',
        'border border-gray-200',
      )}
      {...props}
    >
      <span className="w-max">Quick search...</span>
      <kbd
        className={clsxm(
          'inline-flex items-center gap-0.5 px-2 py-1 font-serif',
          'rounded border border-base-200 bg-base-50 text-gray-600 opacity-70 dark:border-base-700 dark:bg-transparent dark:text-gray-300',
        )}
      >
        <span>{KbdSymbols.CMD}</span>
        <span>K</span>
      </kbd>
    </button>
  );
}

function SearchModalToggleSmall(props: SearchModalToggleProps) {
  return (
    <button
      className={clsxm(
        'rounded-full',
        'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100',
      )}
      {...props}
    >
      <SearchIcon variant="solid" className="m-auto" />
    </button>
  );
}

function SearchModalToggle({ style }: { style?: CSSProperties }) {
  const searchModal = useSearchModal();

  return (
    <>
      <div className="hidden sm:block sm:flex-1">
        <SearchModalToggleLarge
          onClick={searchModal.onRequestOpen}
          style={style}
        />
      </div>
      <div className="sm:hidden">
        <SearchModalToggleSmall
          onClick={searchModal.onRequestOpen}
          style={style}
        />
      </div>
    </>
  );
}

export default SearchModalToggle;
