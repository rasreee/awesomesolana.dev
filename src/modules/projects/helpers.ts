import { ContentTag, filterTagsByType } from '../tags';
import { projects } from './constants';
import { Project } from './types';

export const filterProjects = (tags: ContentTag[]): Project[] => {
  const dependencies = filterTagsByType(tags, 'dependency').map(
    (dependency) => dependency.name,
  );

  const topics = filterTagsByType(tags, 'topic').map((topic) => topic.name);

  return projects.filter(
    (project) =>
      project.dependencies.some((dependency) =>
        dependencies.includes(dependency),
      ) || project.topics.some((topic) => topics.includes(topic)),
  );
};
