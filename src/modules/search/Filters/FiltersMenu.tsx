import { getFilterTypes } from '@/api/filters';
import clsxm from '@/lib/clsxm';

import { useSearch } from '../SearchContext';
import { FilterSection } from './FilterSection';

export function FiltersMenu({ autoExpand = false }: { autoExpand?: boolean }) {
  const { search, clearFilters } = useSearch();

  const selectedCount = search.tags?.length ?? 0;

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex items-center justify-between px-5">
        <div className="text-lg font-semibold">Filters</div>
        {selectedCount > 0 && (
          <button
            onClick={clearFilters}
            className={clsxm(
              'border border-transparent hover:border-gray-300 dark:hover:border-base-500',
              'active:bg-surface-1 bg-surface',
              'text disabled:text-hint rounded-md px-3 py-1 text-sm font-medium transition-all',
            )}
          >
            Clear all
          </button>
        )}
      </div>
      <div>
        {getFilterTypes().map((type) => (
          <FilterSection autoExpand={autoExpand} type={type} key={type} />
        ))}
      </div>
    </div>
  );
}
