import { Project } from '@/api/projects';
import { useSearchOptions } from '@/contexts/AppContext';
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
    ? `Showing ${hits.length} ${pluralize('result', hits.length)}`
    : `No results found`;

  return result;
}

export function ResultsInfo({ hits }: { hits: Project[] }) {
  const filters = useSearchFilters();
  const hasFilters = Boolean(filters.length);

  const clearFilters = useClearFilters();

  const { isOpen: isSearchOptionsOpen } = useSearchOptions();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text text-sm opacity-90">
          {getInfoText({ hits, hasFilters })}
        </span>
        {!isSearchOptionsOpen && hasFilters && (
          <SolidButton
            onClick={clearFilters.all}
            className="py-2 text-sm leading-none"
          >
            Clear filters
          </SolidButton>
        )}
      </div>
      <FilterTags />
    </div>
  );
}
