import { filtersByType, FilterType, toPluralFilterType } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { ChevronDownIcon, ChevronUpIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

import { FilterMenu } from './FilterMenu';

export function FilterSection({
  type,
  onToggle,
  isExpanded,
  onClear,
}: {
  type: FilterType;
  isExpanded: boolean;
  onToggle: () => void;
  onClear: () => void;
}) {
  const { search } = useSearch();

  const selectedCount = filtersByType(search.tags ?? [], type).length;

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
          {toPluralFilterType(type)}{' '}
          {selectedCount > 0 ? `(${selectedCount})` : ''}
        </div>
      </button>
      <div className="px-5">
        {isExpanded && <FilterMenu type={type} onClear={onClear} />}
      </div>
    </div>
  );
}
