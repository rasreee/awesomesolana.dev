import { useRef, useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import clsxm from '@/lib/clsxm';

import { MobileFiltersMenu } from './MobileFiltersMenu';
import { SearchField } from './SearchField';

export function MobileSearchBox() {
  const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside(popoverRef, (e) => {
    if (buttonRef.current?.contains(e.target as HTMLElement)) return;
    setFiltersMenuOpen(false);
  });

  const toggleFiltersMenu = () => {
    setFiltersMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      <SearchField
        filtersMenuOpen={filtersMenuOpen}
        onClickFilters={toggleFiltersMenu}
      />
      <div className="relative">
        {filtersMenuOpen && (
          <div
            className={clsxm(
              'min-h-0',
              'flex flex-col',
              'rounded-lg',
              'shadow-lg',
              'overflow-hidden',
              'absolute z-50',
              'bg-surface w-full',
            )}
            ref={popoverRef}
          >
            <MobileFiltersMenu
              onRequestClose={() => {
                setFiltersMenuOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
