import { Project } from '@/api/projects';
import { ClearFiltersButton } from '@/modules/search/ClearFiltersButton';

export function ResultsInfo({ hits }: { hits: Project[] }) {
  const infoText = hits.length
    ? `${hits.length} ${hits.length === 1 ? 'result' : 'results'} found`
    : `No results found.`;

  return (
    <div className="flex items-center justify-between">
      <span className="text text-base opacity-90">{infoText}</span>
      <ClearFiltersButton />
    </div>
  );
}
