import { useSearch } from '@/contexts/SearchContext';
import { SolidButton } from '@/ui/components';

export const ClearFiltersButton = () => {
  const { clearFilters, hasFilters } = useSearch();

  if (!hasFilters) return null;

  return (
    <SolidButton className="py-2 text-sm leading-none" onClick={clearFilters}>
      Clear all
    </SolidButton>
  );
};
