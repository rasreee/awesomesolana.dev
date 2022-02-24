import { useState } from 'react';

import { filtersByType, SearchFilter, toPluralFilterType } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { ChevronDownIcon, ChevronUpIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

import { FilterMenu } from './FilterMenu';

export function FilterSection({
  type,
  autoExpand = false,
}: {
  type: SearchFilter['type'];
  autoExpand?: boolean;
}) {
  const { search } = useSearch();

  const [expanded, setExpanded] = useState(autoExpand);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const selectedCount = filtersByType(search.tags ?? [], type).length;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={toggleExpanded}
        className="hover:bg-surface-1 flex w-full items-center gap-3 px-5 py-3"
      >
        <div className={clsxm('text', expanded && 'text-primary-500')}>
          {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
        <div className={clsxm(expanded && 'font-semibold')}>
          {toPluralFilterType(type)}{' '}
          {selectedCount > 0 ? `(${selectedCount})` : ''}
        </div>
      </button>
      <div className="px-5">{expanded && <FilterMenu type={type} />}</div>
    </div>
  );
}
