import { FilterCategory, getFilterCategorys } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { ClearFiltersButton } from '@/modules/search/ClearFiltersButton';
import { useSelections } from '@/ui/hooks/useSelections';

import { FilterSection } from './FilterSection';

export function Filters() {
  const { search, clearFiltersByType } = useSearch();

  const selectedCount = search.tags?.length ?? 0;

  const { getIsExpanded, toggleSelection } = useSelections<FilterCategory>(
    getFilterCategorys(),
  );

  const handleToggleCategory = (category: FilterCategory) => () => {
    toggleSelection(category);
  };

  const handleClearCategory = (category: FilterCategory) => () => {
    clearFiltersByType(category);
  };

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex items-center justify-between px-5">
        <div className="text-lg font-semibold">Filters</div>
        {selectedCount > 0 && <ClearFiltersButton />}
      </div>
      <div>
        {getFilterCategorys().map((category) => (
          <FilterSection
            key={category}
            category={category}
            isExpanded={getIsExpanded(category)}
            onToggle={handleToggleCategory(category)}
            onClear={handleClearCategory(category)}
          />
        ))}
      </div>
    </div>
  );
}
