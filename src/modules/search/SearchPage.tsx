import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { useSearchFilters } from '@/contexts/SearchContext';

import {
  Results,
  SearchField,
  SearchOptionsButton,
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
      <div className="flex items-center gap-2">
        <SearchField autoFocused {...searchField} />
        <SearchOptionsButton />
      </div>
      <Results hits={searchField.hits} />
    </div>
  );
}
