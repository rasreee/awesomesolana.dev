import React from 'react';

import { getFilterTypes } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { ClearFiltersButton } from '@/modules/search/ClearFiltersButton';

import { FilterSection } from './FilterSection';

export function Filters({ autoExpand = false }: { autoExpand?: boolean }) {
  const { search } = useSearch();

  const selectedCount = search.tags?.length ?? 0;

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex items-center justify-between px-5">
        <div className="text-lg font-semibold">Filters</div>
        {selectedCount > 0 && <ClearFiltersButton />}
      </div>
      <div>
        {getFilterTypes().map((type) => (
          <FilterSection autoExpand={autoExpand} type={type} key={type} />
        ))}
      </div>
    </div>
  );
}
