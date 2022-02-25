import { FILTER_CATEGORIES, FilterCategory } from '@/api/tags';
import { useSearch } from '@/contexts/SearchContext';
import { ClearFiltersButton } from '@/modules/search/ClearFiltersButton';
import { useSelections } from '@/ui/hooks/useSelections';

import { FilterSection } from './FilterSection';

export function FiltersSidebar() {
  const { clearFiltersByType } = useSearch();

  const { getIsExpanded, toggleSelection } =
    useSelections<FilterCategory>(FILTER_CATEGORIES);

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
        <ClearFiltersButton />
      </div>
      <div>
        {FILTER_CATEGORIES.map((category) => (
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
