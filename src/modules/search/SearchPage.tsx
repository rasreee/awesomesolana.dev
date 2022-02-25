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
import { Layout, SearchField, useSearchField } from '@/ui/components';
import { AdjustmentsIcon } from '@/ui/icons';

import { Results } from './Results';

export function SearchPage() {
  const searchFilters = useSearchFilters();

  async function searchProjectsByQuery(query: string): Promise<Project[]> {
    const initialResult = filterProjectsByTags(ALL_PROJECTS, searchFilters);
    const result = filterProjectsByTitle(initialResult, query);

    return result;
  }

  const searchField = useSearchField(searchProjectsByQuery);

  return (
    <Layout>
      <div className="flex-1 px-3 sm:px-6">
        <div className="flex items-center gap-2">
          <SearchField autoFocused {...searchField} />
          <SearchOptionsMenuToggle />
        </div>
        <Results hits={searchField.hits} />
      </div>
    </Layout>
  );
}

function SearchOptionsMenuToggle() {
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
        className={clsxm('text-hint', isOpen && 'text-color-primary')}
      />
    </button>
  );
}
