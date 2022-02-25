import React from 'react';

import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { FILTER_CATEGORIES } from '@/api/tags';
import { useSearchFilters } from '@/contexts/SearchContext';

import {
  FilterItemToggle,
  Results,
  SearchField,
  useSearchField,
} from './components';

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
      <div className="flex flex-col gap-2">
        <SearchField autoFocused {...searchField} />
        <FilterBar />
      </div>
      <Results hits={searchField.hits} />
    </div>
  );
}

export function FilterBar() {
  return (
    <>
      <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
        {FILTER_CATEGORIES.map((name) => (
          <li key={name}>
            <FilterItemToggle category={name} />
          </li>
        ))}
      </ul>
    </>
  );
}
