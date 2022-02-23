import { ALL_PROJECTS, Project } from '@/data/projects';
import { TAG_TYPES } from '@/data/tags';
import clsxm from '@/lib/clsxm';

import { ProjectItem } from './ProjectItem';
import { useSearch } from './SearchContext';
import { TagsMenu } from './TagsMenu';

export function MobileResults({ projects }: { projects: Project[] }) {
  const projectsToShow = projects.length ? projects : ALL_PROJECTS;

  return (
    <div>
      <div className="flex flex-col py-2 px-1">
        <FilterTags />
        <ResultsInfo projects={projectsToShow} />
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

function ResultsInfo({ projects }: { projects: Project[] }) {
  const { clearFilters, search } = useSearch();

  return (
    <div className="flex items-center justify-between">
      <span className="text text-base opacity-90">
        {projects.length} {projects.length === 1 ? 'result' : 'results'} found
      </span>
      <button
        disabled={!Boolean(search.tags?.length)}
        onClick={clearFilters}
        className={clsxm(
          'active:bg-surface-1 text bg-surface disabled:text-hint rounded-md px-3 py-1 text-sm font-medium transition-all',
        )}
      >
        Clear all filters
      </button>
    </div>
  );
}

function FilterTags() {
  return (
    <>
      <ul className="flex items-center gap-2 overflow-x-auto">
        {TAG_TYPES.map((type) => (
          <li key={type}>
            <TagsMenu type={type} />
          </li>
        ))}
      </ul>
    </>
  );
}
