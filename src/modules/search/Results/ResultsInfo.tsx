import { Project } from '@/api/projects';
import { useAppState } from '@/contexts/AppStateContext';
import { useClearFilters, useSearchFilters } from '@/contexts/SearchContext';
import pluralize from '@/lib/pluralize';
import { SolidButton } from '@/ui/components';

import { FilterTags } from './FilterTags';

function getInfoText({
  hits,
  hasFilters,
}: {
  hits: Project[];
  hasFilters: boolean;
}): string {
  if (!hasFilters) return `Showing all ${hits.length} results`;

  const result = hits.length
    ? `Showing ${hits.length} ${pluralize('result', hits.length)} for `
    : `No results found`;

  return result;
}

export function ResultsInfo({ hits }: { hits: Project[] }) {
  const filters = useSearchFilters();
  const hasFilters = Boolean(filters.length);

  const clearFilters = useClearFilters();

  const { filtersMenu } = useAppState();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text text-sm opacity-90">
          {getInfoText({ hits, hasFilters })}
        </span>
        {!filtersMenu.isOpen && hasFilters && (
          <SolidButton
            onClick={clearFilters.all}
            className="py-2 text-sm leading-none"
          >
            Clear all filters
          </SolidButton>
        )}
      </div>
      <FilterTags />
    </div>
  );
}
