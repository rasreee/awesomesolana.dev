import { FilterType, getFilterTypes } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { ClearFiltersButton } from '@/modules/search/ClearFiltersButton';
import { useSelections } from '@/ui/hooks/useSelections';

import { FilterSection } from './FilterSection';

export function Filters() {
  const { search } = useSearch();

  const selectedCount = search.tags?.length ?? 0;

  const { getIsExpanded, toggleSelection } = useSelections<FilterType>(
    getFilterTypes(),
  );

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex items-center justify-between px-5">
        <div className="text-lg font-semibold">Filters</div>
        {selectedCount > 0 && <ClearFiltersButton />}
      </div>
      <div>
        {getFilterTypes().map((type) => (
          <FilterSection
            key={type}
            type={type}
            isExpanded={getIsExpanded(type)}
            onToggleExpanded={toggleSelection}
          />
        ))}
      </div>
    </div>
  );
}
