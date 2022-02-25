import React from 'react';

import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { useSearch } from '@/contexts/SearchContext';
import { Layout, SearchField, useSearchField } from '@/ui/components';

import { Filters } from './Filters';
import { Results } from './Results';

export function SearchPage() {
  const {
    search: { tags },
  } = useSearch();

  async function searchProjectsByQuery(query: string): Promise<Project[]> {
    const initialResult = filterProjectsByTags(ALL_PROJECTS, tags ?? []);
    const result = filterProjectsByTitle(initialResult, query);

    return result;
  }

  const searchField = useSearchField(searchProjectsByQuery);

  return (
    <Layout>
      <div className="w-full gap-3 sm:flex sm:items-start">
        <div className="flex-1 px-3 sm:px-6">
          <SearchField autoFocused {...searchField} />
          <Results hits={searchField.hits} />
        </div>
        <Filters />
      </div>
    </Layout>
  );
}
