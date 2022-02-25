import { Tag } from '@/modules/tags';

import { ALL_PROJECTS } from './constants';

export function getProjectsCountForTag(tag: Tag): number {
  return ALL_PROJECTS.filter((project) =>
    project.tags.filter(
      (projectTag) =>
        projectTag.category === tag.category && projectTag.name === tag.name,
    ),
  ).length;
}
