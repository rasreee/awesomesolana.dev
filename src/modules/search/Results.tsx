import { filterProjects } from '../projects';
import { ProjectItem } from './ProjectItem';
import { useSearch } from './SearchContext';

export function Results() {
  const { search } = useSearch();

  return (
    <div>
      {filterProjects(search.tags ?? []).map((project) => (
        <ProjectItem key={project.id} {...project} />
      ))}
    </div>
  );
}
