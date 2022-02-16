import React from 'react';

import { useIsMobile } from '@/hooks/useIsMobile';
import clsxm from '@/lib/clsxm';

import { KbdSymbols } from './kbdSymbols';
import SearchIcon from './SearchIcon';
import { useSearchModal } from './SearchModalContext';

interface SearchModalToggleProps {
  onClick?: () => void;
}

function SearchModalToggleLarge({ onClick }: SearchModalToggleProps) {
  return (
    <button
      className={clsxm(
        'font-medium',
        'px-4 py-2',
        'flex items-center justify-between gap-5 rounded-md',
        'bg-surface',
        'text-gray-500 dark:text-gray-300',
        'text-sm',
        'flex-1 sm:w-[40%]',
      )}
      onClick={onClick}
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
}

function SearchModalToggleSmall({ onClick }: SearchModalToggleProps) {
  return (
    <button
      className={clsxm(
        'rounded-full p-2',
        'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100',
      )}
      onClick={onClick}
    >
      <SearchIcon variant="solid" />
    </button>
  );
}

function SearchModalToggle() {
  const searchModal = useSearchModal();
  const isMobile = useIsMobile();
  const Button = React.useMemo(
    () => (isMobile ? SearchModalToggleSmall : SearchModalToggleLarge),
    [isMobile],
  );

  return <Button onClick={searchModal.onRequestOpen} />;
}

export default SearchModalToggle;
