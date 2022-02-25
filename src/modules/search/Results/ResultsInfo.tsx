import { Project } from '@/api/projects';
import { Tag } from '@/api/tags';
import { useSearch } from '@/contexts/SearchContext';
import { useUiState } from '@/contexts/UiStateContext';
import pluralize from '@/lib/pluralize';
import { SolidButton } from '@/ui/components';

import { FilterTag } from './FilterTag';

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
  const {
    search: { tags },
    hasFilters,
    clearFilters,
    removeFilter,
  } = useSearch();

  const { filtersMenu } = useUiState();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text text-sm opacity-90">
          {getInfoText({ hits, hasFilters })}
        </span>
        {!filtersMenu.isOpen && hasFilters && (
          <SolidButton
            onClick={clearFilters}
            className="py-2 text-sm leading-none"
          >
            Clear all filters
          </SolidButton>
        )}
      </div>
      <FilterTags tags={tags ?? []} removeFilter={removeFilter} />
    </div>
  );
}

export function FilterTags({
  tags,
  removeFilter,
}: {
  tags: Tag[];
  removeFilter: (tag: Tag) => void;
}) {
  const handleRemoveTag = (tag: Tag) => () => {
    removeFilter(tag);
  };

  return (
    <ul className="flex items-center gap-2">
      {tags?.map((tag) => (
        <li key={`${tag.category}_${tag.name}`}>
          <FilterTag tag={tag} onRemove={handleRemoveTag} />
        </li>
      ))}
    </ul>
  );
}
