import { FILTER_CATEGORIES, FilterCategory } from '@/api/tags';
import clsxm from '@/lib/clsxm';
import { ClearFiltersButton, FiltersMenuProps } from '@/modules/search';
import { useSelections } from '@/ui/hooks/useSelections';

import { FilterSection } from './FilterSection';

export function FiltersSidebar({ onRequestClear }: FiltersMenuProps) {
  const { getIsExpanded, toggleSelection } =
    useSelections<FilterCategory>(FILTER_CATEGORIES);

  const handleToggleCategory = (category: FilterCategory) => () => {
    toggleSelection(category);
  };

  return (
    <div className={clsxm('bg-surface', 'flex flex-col gap-2 py-3')}>
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
            onClear={onRequestClear}
          />
        ))}
      </div>
    </div>
  );
}
