import { useSearchFilters } from '@/contexts/SearchContext';
import { searchProjects, useSearchGithubRepos } from '@/modules/projects';
import { FILTER_CATEGORIES } from '@/modules/tags';

import {
  FilterItemToggle,
  Results,
  SearchField,
  useSearchField,
} from './components';

export function SearchPage() {
  const searchFilters = useSearchFilters();

  const searchField = useSearchField((query) =>
    searchProjects(query, searchFilters),
  );

  const { data } = useSearchGithubRepos(searchField.query, searchFilters);

  return (
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex flex-col gap-2">
        <SearchField autoFocused {...searchField} />
        <FilterBar />
      </div>
      <Results hits={data} />
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
