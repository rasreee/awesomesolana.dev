import { useRef, useState } from 'react';

import { useClickOutside } from '@/ui/hooks';
import { clsxm } from '@/ui/utils';

import { MobileFilters } from './Filters';
import { SearchField } from './SearchField';

export function MobileSearchBox() {
  const [FiltersOpen, setFiltersOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside(popoverRef, (e) => {
    if (buttonRef.current?.contains(e.target as HTMLElement)) return;
    setFiltersOpen(false);
  });

  const toggleFilters = () => {
    setFiltersOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      <SearchField FiltersOpen={FiltersOpen} onClickFilters={toggleFilters} />
      <div className="relative">
        {FiltersOpen && (
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
            <MobileFilters
              onRequestClose={() => {
                setFiltersOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
