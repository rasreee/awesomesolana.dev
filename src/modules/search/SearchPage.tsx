import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { useSearchFilters } from '@/contexts/SearchContext';
import { Layout, SearchField, useSearchField } from '@/ui/components';
import { SearchOptionsMenuToggle } from '@/ui/components/SearchOptionsMenuToggle';

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
