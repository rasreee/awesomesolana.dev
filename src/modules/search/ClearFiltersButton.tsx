import { useSearch } from '@/contexts/search';
import { clsxm } from '@/ui/utils';

export const ClearFiltersButton = () => {
  const { clearFilters, search } = useSearch();

  return (
    <button
      onClick={clearFilters}
      disabled={!search.tags?.length}
      className={clsxm(
        'border border-transparent hover:border-gray-300 dark:hover:border-base-500',
        'active:bg-surface-1 bg-surface',
        'text disabled:text-hint',
        'rounded-md px-3 py-1 text-sm font-medium transition-all',
      )}
    >
      Clear all
    </button>
  );
};
