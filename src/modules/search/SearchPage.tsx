import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { useSearch } from '@/contexts/search';
import { Layout } from '@/ui/components';
import { useMenu } from '@/ui/hooks';

import { FiltersMenu } from './FiltersMenu';
import { Results } from './Results';
import { SearchField, useSearchField } from './SearchField';

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

  const {
    isOpen: isFiltersMenuOpen,
    close: closeFiltersMenu,
    toggle: toggleFiltersMenu,
  } = useMenu();

  return (
    <Layout>
      <div className="w-full gap-3 sm:flex sm:items-start">
        <div className="flex-1 px-3 sm:px-6">
          <SearchField
            isFiltersMenuOpen={isFiltersMenuOpen}
            onShowFilters={toggleFiltersMenu}
            {...searchField}
          />
          <Results hits={searchField.hits} />
        </div>
        <FiltersMenu
          isOpen={isFiltersMenuOpen}
          onRequestClose={closeFiltersMenu}
        />
      </div>
    </Layout>
  );
}
