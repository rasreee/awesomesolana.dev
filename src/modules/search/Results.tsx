import { Project } from '@/data/projects';

import { ProjectItem } from './ProjectItem';

export function Results({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectItem {...project} />
        </li>
      ))}
    </ul>
  );
}
