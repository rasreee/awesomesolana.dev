import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/api/projects';
import { useSearch } from '@/contexts/search';
import { HideOnMobile, OnlyMobile } from '@/ui/components';
import { Layout } from '@/ui/components';

import { Filters } from './Filters';
import { MobileSearchBox } from './MobileSearchBox';
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
  const { hits } = searchField;

  return (
    <Layout>
      <OnlyMobile className="mx-5">
        <MobileSearchBox searchField={searchField} />
        <Results hits={hits} />
      </OnlyMobile>
      <HideOnMobile>
        <div className="flex justify-around gap-3 px-3">
          <div className="flex-1">
            <SearchField {...searchField} />
            <Results hits={hits} />
          </div>
          <div className="bg-surface sm:3/12 rounded-md lg:w-4/12">
            <Filters autoExpand />
          </div>
        </div>
      </HideOnMobile>
    </Layout>
  );
}
