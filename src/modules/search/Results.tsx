import { ALL_PROJECTS } from '@/api/projects';
import { OnlyMobile } from '@/ui/components';

import { MobileFilterBar } from './MobileFilterBar';
import { ProjectItem } from './ProjectItem';
import { ResultsInfo } from './ResultsInfo';
import { useSearch } from './SearchContext';

export function Results() {
  const { filteredProjects } = useSearch();

  const projectsToShow = filteredProjects.length
    ? filteredProjects
    : ALL_PROJECTS;

  return (
    <div>
      <div className="flex flex-col py-2 px-1">
        <OnlyMobile>
          <MobileFilterBar />
        </OnlyMobile>
        <ResultsInfo />
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
