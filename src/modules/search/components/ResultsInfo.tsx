import { Project } from '@/api/projects';
import { useSearchFilters } from '@/contexts/SearchContext';
import pluralize from '@/lib/pluralize';

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

  return (
    <div className="flex flex-col gap-4">
      <FilterTags />
      <span className="text text-sm leading-none opacity-90">
        {getInfoText({ hits, hasFilters })}
      </span>
    </div>
  );
}
