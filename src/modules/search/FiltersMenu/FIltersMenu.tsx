import { useMemo } from 'react';

import { FilterCategory } from '@/api/tags';
import { useSearch } from '@/contexts/SearchContext';
import { useUiState } from '@/contexts/UiStateContext';
import { useIsMobile } from '@/ui/hooks';

import { FiltersModal } from './FiltersModal';
import { FiltersSidebar } from './FiltersSidebar';

export type FiltersMenuProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onRequestClear: (category?: FilterCategory) => void;
};

export function FiltersMenu() {
  const { filtersMenu } = useUiState();
  const { clearFilters, clearFiltersByType } = useSearch();

  const isMobile = useIsMobile();

  const onRequestClear = (category?: FilterCategory) =>
    category ? clearFiltersByType(category) : clearFilters();

  const CompToRender = useMemo(
    () =>
      isMobile
        ? (props: FiltersMenuProps) => <FiltersModal {...props} />
        : (props: FiltersMenuProps) => <FiltersSidebar {...props} />,
    [isMobile],
  );

  return <CompToRender {...filtersMenu} onRequestClear={onRequestClear} />;
}
