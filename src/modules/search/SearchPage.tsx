import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { useSearch } from '@/contexts/search';
import { Layout } from '@/ui/components';

import { Results } from './Results';
import { SearchBox } from './SearchBox';
import { useSearchField } from './SearchField';

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
  const { hits } = searchField;

  return (
    <Layout>
      <div className="flex justify-around gap-3 px-3">
        <div className="flex-1">
          <SearchBox searchField={searchField} />
          <Results hits={hits} />
        </div>
      </div>
    </Layout>
  );
}
