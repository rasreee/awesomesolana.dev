import {
  FilterCategory,
  filtersByType,
  toPluralFilterCategory,
} from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { ChevronDownIcon, ChevronUpIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

import { FilterMenu } from './FilterMenu';

export function FilterSection({
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
  const { search } = useSearch();

  const selectedCount = filtersByType(search.tags ?? [], category).length;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onToggle}
        className="hover:bg-surface-1 flex w-full items-center gap-3 px-5 py-3"
      >
        <div className={clsxm('text', isExpanded && 'text-primary-500')}>
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
        <div className={clsxm(isExpanded && 'font-semibold')}>
          {toPluralFilterCategory(category)}{' '}
          {selectedCount > 0 ? `(${selectedCount})` : ''}
        </div>
      </button>
      <div className="px-5">
        {isExpanded && <FilterMenu category={category} onClear={onClear} />}
      </div>
    </div>
  );
}
