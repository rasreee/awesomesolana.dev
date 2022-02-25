import { useSearchFilters } from '@/contexts/SearchContext';
import { FILTER_CATEGORIES } from '@/modules/tags';

import { searchGitHubRepos } from '../github/api';
import { useSearchGithubRepos } from '../github/useSearchGitHubRepos';
import {
  FilterItemToggle,
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
          <div>...</div>
        )}
      </div>
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
