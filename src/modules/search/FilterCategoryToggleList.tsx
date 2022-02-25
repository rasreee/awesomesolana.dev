import { FilterCategory } from '@/api/tags';
import { capitalizeFirst } from '@/common/utils';
import { useCountFilters } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { ChevronDownIcon, ChevronUpIcon } from '@/ui/icons';

import { FilterCategoryMenu } from './FilterCategoryMenu';

export function FilterCategoryToggleList({
  category,
  onToggle,
  isExpanded,
  onClear,
}: {
  category: FilterCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onClear: () => void;
}) {
  const selectedCount = useCountFilters()(category);

  return (
    <div>
      <button
        onClick={onToggle}
        className="hover:bg-surface-1 flex w-full items-center gap-3 px-5 py-3"
      >
        <div className={clsxm('text', isExpanded && 'text-primary-500')}>
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
        <div className={clsxm(isExpanded && 'font-semibold')}>
          {capitalizeFirst(pluralize(category))}{' '}
          {selectedCount > 0 ? `(${selectedCount})` : ''}
        </div>
      </button>
      <div className="px-5">
        {isExpanded && (
          <FilterCategoryMenu category={category} onClear={onClear} />
        )}
      </div>
    </div>
  );
}
