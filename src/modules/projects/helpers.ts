import { ContentTag, filterTagsByType } from '../tags';
import { allProjects } from './constants';
import { Project } from './types';

export const filterProjects = (tags: ContentTag[]): Project[] => {
  const dependencies = filterTagsByType(tags, 'dependency').map(
    (dependency) => dependency.name,
  );

  const topics = filterTagsByType(tags, 'topic').map((topic) => topic.name);

  return allProjects.filter(
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
  if (!query) return [];

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
  const dependencies = filterTagsByType(tags, 'dependency').map(
    (dependency) => dependency.name,
  );

  const topics = filterTagsByType(tags, 'topic').map((topic) => topic.name);

  return projects.filter(
    (project) =>
      filterTagsByType(project.tags, 'dependency').some((dependency) =>
        dependencies.includes(dependency.name),
      ) ||
      filterTagsByType(project.tags, 'topic').some((topic) =>
        topics.includes(topic.name),
      ),
  );
}
