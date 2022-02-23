import { ALL_PROJECTS, Project } from '@/data/projects';

import { ProjectItem } from './ProjectItem';
import { useSearch } from './SearchContext';

export function Results({ projects }: { projects: Project[] }) {
  const projectsToShow = projects.length ? projects : ALL_PROJECTS;

  const { clearFilters } = useSearch();

  return (
    <div>
      <div className="flex flex-col gap-2 py-2 px-1">
        <div className="flex items-center justify-between">
          <span className="text-hint text-base">
            {projectsToShow.length}{' '}
            {projects.length === 1 ? 'result' : 'results'} found
          </span>
          <button
            onClick={clearFilters}
            className="active:bg-surface-1 text bg-surface rounded-md px-3 py-1 text-sm font-medium opacity-80 transition-all"
          >
            Clear all filters
          </button>
        </div>
      </div>
      <ul>
        {projectsToShow.map((project) => (
          <li key={project.id}>
            <ProjectItem {...project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
