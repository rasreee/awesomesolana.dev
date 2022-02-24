import clsxm from '@/ui/clsxm';

import { useSearch } from '../SearchContext';

export function ResultsInfo() {
  const { clearFilters, search, filteredProjects } = useSearch();

  const infoText = filteredProjects.length
    ? `${filteredProjects.length} ${
        filteredProjects.length === 1 ? 'result' : 'results'
      } found`
    : `No results found.`;

  return (
    <div className="flex items-center justify-between">
      <span className="text text-base opacity-90">{infoText}</span>
      <button
        disabled={!Boolean(search.tags?.length)}
        onClick={clearFilters}
        className={clsxm(
          'border border-transparent hover:border-base-400 dark:hover:border-base-500',
          'active:bg-surface-1 text bg-surface disabled:text-hint rounded-md px-3 py-1 text-sm font-medium transition-all',
        )}
      >
        Clear all
      </button>
    </div>
  );
}
