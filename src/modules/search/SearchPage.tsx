import React from 'react';

import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { useSearchOptions } from '@/contexts/AppContext';
import { useSearchFilters } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import { AdjustmentsIcon } from '@/ui/icons';

import { Results } from './Results';
import { SearchField, useSearchField } from './SearchField';

export function SearchPage() {
  const searchFilters = useSearchFilters();

  async function searchProjectsByQuery(query: string): Promise<Project[]> {
    const initialResult = filterProjectsByTags(ALL_PROJECTS, searchFilters);
    const result = filterProjectsByTitle(initialResult, query);

    return result;
  }

  const searchField = useSearchField(searchProjectsByQuery);

  return (
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex items-center gap-2">
        <SearchField autoFocused {...searchField} />
        <SearchOptionsToggle />
      </div>
      <Results hits={searchField.hits} />
    </div>
  );
}

function SearchOptionsToggle() {
  const { isOpen, toggle } = useSearchOptions();

  return (
    <button
      onClick={toggle}
      className={clsxm(
        'text',
        isOpen && 'bg-surface text-color-primary',
        'h-full rounded p-1',
      )}
    >
      <AdjustmentsIcon
        className={clsxm('text-hint', isOpen && 'text-color-p`rimary')}
      />
    </button>
  );
}
