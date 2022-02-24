import { getFilterTypes } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { XIcon } from '@/ui/icons';

import { FilterSection } from './FilterSection';

export function MobileFilters({
  onRequestClose,
}: {
  onRequestClose: () => void;
}) {
  const { clearFilters } = useSearch();

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
          {getFilterTypes().map((type) => (
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
