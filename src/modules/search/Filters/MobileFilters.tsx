import { FilterType, getFilterTypes } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { GhostButton } from '@/ui/components';
import { useSelections } from '@/ui/hooks/useSelections';
import { XIcon } from '@/ui/icons';

import { FilterSection } from './FilterSection';

export function MobileFilters({
  onRequestClose,
}: {
  onRequestClose: () => void;
}) {
  const { clearFilters, search } = useSearch();

  const { getIsExpanded, toggleSelection } = useSelections<FilterType>();

  return (
    <>
      <div className="flex flex-col gap-2 py-3">
        <div className="flex items-center justify-between px-5">
          <div className="text-lg font-semibold">Filters</div>
          <div className="flex items-center gap-5">
            <button onClick={onRequestClose}>
              <XIcon />
            </button>
          </div>
        </div>
        <div>
          {getFilterTypes().map((type) => (
            <FilterSection
              type={type}
              key={type}
              isExpanded={getIsExpanded(type)}
              onToggleExpanded={toggleSelection}
            />
          ))}
        </div>
        <div className="flex items-center justify-around px-5 py-1">
          <GhostButton onClick={clearFilters} disabled={!search.tags?.length}>
            Clear
          </GhostButton>
          <GhostButton className="text-color-primary" onClick={onRequestClose}>
            Done
          </GhostButton>
        </div>
      </div>
    </>
  );
}
