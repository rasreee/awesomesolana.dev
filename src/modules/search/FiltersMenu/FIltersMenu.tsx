import { useMemo } from 'react';

import { useSearchOptionsMenu } from '@/contexts/SearchOptionsMenuContext';
import { useIsMobile } from '@/ui/hooks';

import { FiltersModal } from './FiltersModal';
import { FiltersSidebar } from './FiltersSidebar';

export type FiltersMenuProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function FiltersMenu() {
  const { filtersMenu } = useSearchOptionsMenu();

  const isMobile = useIsMobile();

  const CompToRender = useMemo(
    () =>
      isMobile
        ? (props: FiltersMenuProps) => <FiltersModal {...props} />
        : (props: FiltersMenuProps) => <FiltersSidebar {...props} />,
    [isMobile],
  );

  return <CompToRender {...filtersMenu} />;
}
