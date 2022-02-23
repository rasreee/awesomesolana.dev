import { useState } from 'react';

import { ContentTag, filterTagsByType, TAG_TYPE_TO_PLURAL } from '@/data/tags';
import { capitalizeFirst } from '@/lib/capitalizeFirst';
import clsxm from '@/lib/clsxm';
import { ChevronDownIcon, ChevronUpIcon } from '@/ui/icon/ChevronIcon';

import { useSearch } from '../SearchContext';
import { FilterMenu } from './FilterMenu';

export function FilterSection({
  type,
  autoExpand = false,
}: {
  type: ContentTag['type'];
  autoExpand?: boolean;
}) {
  const { search } = useSearch();

  const [expanded, setExpanded] = useState(autoExpand);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const selectedCount = filterTagsByType(search.tags ?? [], type).length;

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
          {capitalizeFirst(TAG_TYPE_TO_PLURAL[type])}{' '}
          {selectedCount > 0 ? `(${selectedCount})` : ''}
        </div>
      </button>
      <div className="px-5">{expanded && <FilterMenu type={type} />}</div>
    </div>
  );
}
