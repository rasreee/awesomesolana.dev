import { ALL_PROJECTS, Project } from '@/api/projects';
import { OnlyMobile } from '@/ui/components';

import { MobileFilterBar } from './MobileFilterBar';
import { ProjectItem } from './ProjectItem';
import { ResultsInfo } from './ResultsInfo';

export function Results({ hits }: { hits: Project[] }) {
  const hitsToShow = hits.length ? hits : ALL_PROJECTS;

  return (
    <div>
      <div className="flex flex-col py-2 px-1">
        <OnlyMobile>
          <MobileFilterBar />
        </OnlyMobile>
        <ResultsInfo hits={hits} />
      </div>
      <ul>
        {hitsToShow.map((hit) => (
          <li key={hit.id}>
            <ProjectItem {...hit} />
          </li>
        ))}
      </ul>
    </div>
  );
}
