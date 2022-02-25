import React from 'react';

import { useAppState } from '@/contexts/AppStateContext';
import clsxm from '@/lib/clsxm';
import { AdjustmentsIcon } from '@/ui/icons';

export function SearchOptionsMenuToggle() {
  const {
    filtersMenu: { isOpen, toggle },
  } = useAppState();

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
