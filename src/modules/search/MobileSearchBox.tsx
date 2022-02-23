import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { TAG_TYPES } from '@/data/tags';
import { useClickOutside } from '@/hooks/useClickOutside';
import clsxm from '@/lib/clsxm';
import { ErrorMessage, TextInput } from '@/ui/components';
import { AdjustmentsIcon } from '@/ui/icon/AdjustmentsIcon';
import { XIcon } from '@/ui/icon/XIcon';

import { FilterSection } from './Filters';
import { SearchBoxProps } from './SearchBox';
import { StatefulSearchIcon } from './StatefulSearchIcon';

const DEFAULT_PLACEHOLDER = 'Search projects...';

export function MobileSearchBox({
  value,
  onChange,
  isRequesting,
  error,
}: SearchBoxProps) {
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
      <div className="flex items-center gap-1.5">
        <div className="bg-surface flex flex-1 items-center gap-1 rounded-lg px-2 py-1">
          <ErrorMessage>{error}</ErrorMessage>
          <StatefulSearchIcon isRequesting={isRequesting} />
          <TextInput
            type="search"
            name="search"
            placeholder={DEFAULT_PLACEHOLDER}
            value={value}
            onChange={onChange}
            className="text-base"
          />
          <button
            ref={buttonRef}
            onClick={toggleFiltersMenu}
            className={clsxm(
              'text opacity-80',
              filtersMenuOpen && 'bg-surface-2 opacity-100',
              'h-full rounded p-1',
            )}
          >
            <AdjustmentsIcon />
          </button>
        </div>
      </div>
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

function MobileFiltersMenu({ onRequestClose }: { onRequestClose: () => void }) {
  const router = useRouter();

  const clearFilters = () => router.push('/search');

  return (
    <>
      <div className="flex flex-col gap-2 py-3">
        <div className="flex items-center justify-between px-5">
          <div className="text-lg font-semibold">Filters</div>
          <div className="flex items-center gap-5">
            <button onClick={onRequestClose}>
              <XIcon />
            </button>
          </div>
        </div>
        <div>
          {TAG_TYPES.map((type) => (
            <FilterSection type={type} key={type} />
          ))}
        </div>
        <div className="flex items-center justify-around px-5 py-1">
          <button
            onClick={clearFilters}
            className="active:bg-surface-1 text-hint hover:text active:text rounded-md px-12 py-2 text-base font-medium transition-all"
          >
            Clear
          </button>
          <button
            onClick={onRequestClose}
            className="active:bg-surface-1 rounded-md px-12 py-2 text-base font-medium transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
