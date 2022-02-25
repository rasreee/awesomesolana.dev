import { SearchFilter } from '@/api/filters';
import { Project } from '@/api/projects';
import { useAppState } from '@/contexts/AppContext';
import { useSearch } from '@/contexts/SearchContext';
import { SolidButton } from '@/ui/components';

import { FilterTag } from './FilterTag';

function getInfoText({
  hits,
  tags,
}: {
  hits: Project[];
  tags: SearchFilter[] | undefined;
}): string {
  if (!tags?.length) return `Showing ${hits.length} results`;

  const result = hits.length
    ? `${hits.length} ${hits.length === 1 ? 'result' : 'results'}`
    : `No results found`;

  return result;
}

export function ResultsInfo({ hits }: { hits: Project[] }) {
  const {
    search: { tags },
    removeFilter,
    toggleFilter,
    clearFilters,
  } = useSearch();

  const {
    filtersMenu: { isOpen: isFiltersMenuOpen },
  } = useAppState();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text text-sm opacity-90">
          {getInfoText({ hits, tags })}
        </span>
        {!isFiltersMenuOpen && (
          <SolidButton
            onClick={clearFilters}
            className="py-2 text-sm leading-none"
          >
            Clear all filters
          </SolidButton>
        )}
      </div>
      <ul className="flex items-center gap-2">
        {tags?.map((tag) => (
          <li key={`${tag.category}_${tag.name}`}>
            <FilterTag
              tag={tag}
              onRemove={removeFilter}
              onToggle={toggleFilter}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
