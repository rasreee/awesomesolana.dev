import { useMemo } from 'react';

import { useSearchOptions } from '@/contexts/AppContext';
import { useIsMobile } from '@/ui/hooks';

import { FiltersModal } from './FiltersModal';
import { FiltersSidebar } from './FiltersSidebar';

export type FiltersMenuProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function FiltersMenu() {
  const searchOptions = useSearchOptions();

  const isMobile = useIsMobile();

  const CompToRender = useMemo(
    () =>
      isMobile
        ? (props: FiltersMenuProps) => <FiltersModal {...props} />
        : (props: FiltersMenuProps) => <FiltersSidebar {...props} />,
    [isMobile],
  );

  return <CompToRender {...searchOptions} />;
}
