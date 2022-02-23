import { useEffect, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

import {
  ALL_PROJECTS,
  filterProjectsByTags,
  filterProjectsByTitle,
  Project,
} from '@/data/projects';
import { ContentTag } from '@/data/tags';
import { waitFor } from '@/lib/waitFor';
import { HideOnMobile, OnlyMobile } from '@/ui/components';
import { Layout } from '@/ui/layouts';

import { FiltersMenu } from './Filters';
import { MobileSearchBox } from './MobileSearchBox';
import { Results } from './Results';
import { SearchBox } from './SearchBox';
import { useSearch } from './SearchContext';

function useProjectsByTags(
  tags: ContentTag[] | undefined,
): SWRResponse<Project[], Error> {
  const swr = useSWR<Project[], Error>(
    tags
      ? `projects?tags=${encodeURIComponent(
          tags.map((tag) => tag.name).join(','),
        )}`
      : null,
    async (): Promise<Project[]> => {
      const result = await Promise.resolve(ALL_PROJECTS);

      const filtered = filterProjectsByTags(result, tags ?? []);

      return filtered;
    },
  );

  return swr;
}

export function SearchPage() {
  const { search } = useSearch();
  const { data: allProjects } = useProjectsByTags(search.tags);

  const [value, setValue] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!allProjects) return;

    const submitQuery = async (query: string) => {
      setIsRequesting(true);
      setError(null);
      try {
        const newFilteredProjects = filterProjectsByTitle(
          allProjects ?? [],
          query,
        );
        setFilteredProjects(newFilteredProjects);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsRequesting(false);
      }
    };

    waitFor(300).then(() => submitQuery(value));
  }, [value, allProjects]);

  const searchBoxProps = { value, onChange: setValue, isRequesting, error };

  return (
    <Layout>
      <OnlyMobile className="mx-5">
        <MobileSearchBox {...searchBoxProps} />
        <Results
          projects={filteredProjects.length ? filteredProjects : ALL_PROJECTS}
        />
      </OnlyMobile>
      <HideOnMobile>
        <div className="flex justify-around gap-3 px-3">
          <div className="flex-1">
            <SearchBox {...searchBoxProps} />
            <Results
              projects={
                filteredProjects.length ? filteredProjects : ALL_PROJECTS
              }
            />
          </div>
          <div className="bg-surface sm:3/12 rounded-md lg:w-4/12">
            <FiltersMenu autoExpand />
          </div>
        </div>
      </HideOnMobile>
    </Layout>
  );
}
