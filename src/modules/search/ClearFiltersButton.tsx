import { useSearch } from '@/contexts/search';
import { SolidButton } from '@/ui/components';

export const ClearFiltersButton = () => {
  const { clearFilters, search } = useSearch();

  return (
    <SolidButton onClick={clearFilters} disabled={!search.tags?.length}>
      Clear all
    </SolidButton>
  );
};
