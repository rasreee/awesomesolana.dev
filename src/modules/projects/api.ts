import useSWR, { SWRResponse } from 'swr';

import { getIntersection, uniques } from '@/common/utils';

import { Tag } from '../tags';
import { ALL_PROJECTS } from './constants';
import { Project } from './types';

export function filterProjectsByTitle(
  projects: Project[],
  query: string,
): Project[] {
  if (!query) return projects;

  let hits = [] as Project[];

  const a = query.toLowerCase();

  hits = projects.filter((item) => {
    const name = item.title;
    const b = name.toLowerCase().slice(0, query.length);
    return a === b;
  });

  return hits;
}

function isRelevantProject(project: Project, tags: Tag[]): boolean {
  const projectTagTypes = uniques(
    project.tags.map((project) => project.category),
  );

  const commonTags: Tag[] = [];
  projectTagTypes.forEach((category) => {
    const projectTags = project.tags.filter((tag) => tag.category === category);
    const tagsForType = tags.filter((tag) => tag.category === category);

    const intersection = getIntersection(
      projectTags,
      tagsForType,
      (a, b) => a.name === b.name,
    );

    commonTags.push(...intersection);
  });

  return commonTags.length > 0;
}

export function filterProjectsByTags(
  projects: Project[],
  tags: Tag[],
): Project[] {
  if (tags.length === 0) return projects;

  const filtered = projects.filter((project) =>
    isRelevantProject(project, tags),
  );

  return filtered;
}

export async function searchProjects(
  query: string,
  tags: Tag[],
): Promise<Project[]> {
  const initialResult = filterProjectsByTags(ALL_PROJECTS, tags);
  const result = filterProjectsByTitle(initialResult, query);

  return result;
}

export function useProjectsByTags(
  tags: Tag[] | undefined,
): SWRResponse<Project[], Error> {
  const swr = useSWR<Project[], Error>(
    tags
      ? `projects?tags=${encodeURIComponent(
          tags.map((tag) => tag.name).join(','),
        )}`
      : null,
    async (): Promise<Project[]> => {
      return filterProjectsByTags(ALL_PROJECTS, tags ?? []);
    },
  );

  return swr;
}
