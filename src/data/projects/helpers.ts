import { ContentTag, filterTagsByType } from '@/data/tags';

import { ALL_PROJECTS } from './constants';
import { Project } from './types';

export const filterProjects = (tags: ContentTag[]): Project[] => {
  const dependencies = filterTagsByType(tags, 'dependency').map(
    (dependency) => dependency.name,
  );

  const topics = filterTagsByType(tags, 'topic').map((topic) => topic.name);

  return ALL_PROJECTS.filter(
    (project) =>
      filterTagsByType(project.tags, 'dependency').some((dependency) =>
        dependencies.includes(dependency.name),
      ) ||
      filterTagsByType(project.tags, 'topic').some((topic) =>
        topics.includes(topic.name),
      ),
  );
};

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

export function filterProjectsByTags(
  projects: Project[],
  tags: ContentTag[],
): Project[] {
  if (tags.length === 0) return projects;

  const dependencies = filterTagsByType(tags, 'dependency').map(
    (tag) => tag.name,
  );
  const topics = filterTagsByType(tags, 'topic').map((tag) => tag.name);
  const languages = filterTagsByType(tags, 'language').map((tag) => tag.name);
  const frameworks = filterTagsByType(tags, 'framework').map((tag) => tag.name);

  return projects.filter(
    (project) =>
      filterTagsByType(project.tags, 'dependency').some((tag) =>
        dependencies.includes(tag.name),
      ) ||
      filterTagsByType(project.tags, 'topic').some((tag) =>
        topics.includes(tag.name),
      ) ||
      filterTagsByType(project.tags, 'language').some((tag) =>
        languages.includes(tag.name),
      ) ||
      filterTagsByType(project.tags, 'framework').some((tag) =>
        frameworks.includes(tag.name),
      ),
  );
}

export function getProjectsCountForTag(tag: ContentTag): number {
  return ALL_PROJECTS.filter((project) =>
    project.tags.map((t) => t.name).includes(tag.name),
  ).length;
}

export function getProjectsCountForTagType(type: ContentTag['type']): number {
  return ALL_PROJECTS.filter((project) =>
    project.tags.map((tag) => tag.type).includes(type),
  ).length;
}
