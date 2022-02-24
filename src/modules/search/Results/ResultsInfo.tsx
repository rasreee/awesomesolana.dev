import { useSearch } from '@/contexts/search';
import { ClearFiltersButton } from '@/modules/search/ClearFiltersButton';

export function ResultsInfo() {
  const { filteredProjects } = useSearch();

  const infoText = filteredProjects.length
    ? `${filteredProjects.length} ${
        filteredProjects.length === 1 ? 'result' : 'results'
      } found`
    : `No results found.`;

  return (
    <div className="flex items-center justify-between">
      <span className="text text-base opacity-90">{infoText}</span>
      <ClearFiltersButton />
    </div>
  );
}
