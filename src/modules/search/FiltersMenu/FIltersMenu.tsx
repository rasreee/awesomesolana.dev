import { useMemo } from 'react';

import { useAppState } from '@/contexts/AppStateContext';
import { useIsMobile } from '@/ui/hooks';

import { FiltersModal } from './FiltersModal';
import { FiltersSidebar } from './FiltersSidebar';

export type FiltersMenuProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function FiltersMenu() {
  const { filtersMenu } = useAppState();

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
