import { Tag } from '../tags';
import { ALL_PROJECTS } from './constants';
import { filterProjectsByTags, filterProjectsByTitle } from './helpers';
import { Project } from './types';

export async function searchProjects(
  query: string,
  tags: Tag[],
): Promise<Project[]> {
  const initialResult = filterProjectsByTags(ALL_PROJECTS, tags);
  const result = filterProjectsByTitle(initialResult, query);

  return result;
}
