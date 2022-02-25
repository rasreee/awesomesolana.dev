import React from 'react';

import { useSearchFilters } from '@/contexts/SearchContext';

import { searchGitHubRepos } from '../github/api';
import { useSearchGithubRepos } from '../github/useSearchGitHubRepos';
import {
  FilterBar,
  RepoItem,
  ResultsInfo,
  SearchField,
  useSearchField,
} from './components';

export function SearchPage() {
  const filters = useSearchFilters();

  const searchField = useSearchField((query) =>
    searchGitHubRepos(query, filters),
  );

  const { data: hits } = useSearchGithubRepos(searchField.query, filters);

  return (
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex flex-col gap-2">
        <SearchField autoFocused {...searchField} />
        <FilterBar />
      </div>
      <div>
        <ResultsInfo hits={hits} filters={filters} />
        {hits ? (
          <ul>
            {hits.map((hit) => (
              <li key={hit.id}>
                <RepoItem {...hit} />
              </li>
            ))}
          </ul>
        ) : (
          <ul>...</ul>
        )}
      </div>
    </div>
  );
}
