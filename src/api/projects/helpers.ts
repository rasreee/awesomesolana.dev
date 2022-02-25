import useSWR, { SWRResponse } from 'swr';

import { SearchFilter } from '@/api/filters';
import { getIntersection, uniques } from '@/common/utils';

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

function isRelevantProject(project: Project, tags: SearchFilter[]): boolean {
  const projectTagTypes = uniques(
    project.tags.map((project) => project.category),
  );

  const commonTags: SearchFilter[] = [];
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
  tags: SearchFilter[],
): Project[] {
  if (tags.length === 0) return projects;

  const filtered = projects.filter((project) =>
    isRelevantProject(project, tags),
  );

  return filtered;
}

export function getProjectsCountForTag(tag: SearchFilter): number {
  return ALL_PROJECTS.filter((project) =>
    project.tags.map((t) => t.name).includes(tag.name),
  ).length;
}

export function getProjectsCountForTagType(
  category: SearchFilter['category'],
): number {
  return ALL_PROJECTS.filter((project) =>
    project.tags.map((tag) => tag.category).includes(category),
  ).length;
}

export function useProjectsByTags(
  tags: SearchFilter[] | undefined,
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
