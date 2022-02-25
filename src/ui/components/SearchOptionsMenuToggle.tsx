import React from 'react';

import { useSearchOptionsMenu } from '@/contexts/SearchOptionsMenuContext';
import clsxm from '@/lib/clsxm';
import { AdjustmentsIcon } from '@/ui/icons';

export function SearchOptionsMenuToggle() {
  const {
    filtersMenu: { isOpen, toggle },
  } = useSearchOptionsMenu();

  return (
    <button
      onClick={toggle}
      className={clsxm(
        'text',
        isOpen && 'bg-surface text-color-primary',
        'h-full rounded p-1',
      )}
    >
      <AdjustmentsIcon
        className={clsxm('text-hint', isOpen && 'text-color-primary')}
      />
    </button>
  );
}
