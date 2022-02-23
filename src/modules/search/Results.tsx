import { Project } from '../projects';
import { ProjectItem } from './ProjectItem';

export function Results({ filteredProjects }: { filteredProjects: Project[] }) {
  return (
    <div>
      {filteredProjects.map((project) => (
        <ProjectItem key={project.id} {...project} />
      ))}
    </div>
  );
}
