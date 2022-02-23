import { useRouter } from 'next/router';

import { TAG_TYPES } from '@/data/tags';

import { useSearch } from '../SearchContext';
import { FilterSection } from '.';

export function FiltersMenu({ autoExpand = false }: { autoExpand?: boolean }) {
  const router = useRouter();
  const { search } = useSearch();

  const selectedCount = search.tags?.length ?? 0;

  const clearFilters = () => router.push('/search');

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex items-center justify-between px-5">
        <div className="text-lg font-semibold">Filters</div>
        {selectedCount > 0 && (
          <button
            onClick={clearFilters}
            className="bg-surface-1 rounded-md px-2 py-1 text-sm transition-all hover:font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
      <div>
        {TAG_TYPES.map((type) => (
          <FilterSection autoExpand={autoExpand} type={type} key={type} />
        ))}
      </div>
    </div>
  );
}
