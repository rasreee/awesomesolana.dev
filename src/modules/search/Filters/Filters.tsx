import { useIsMobile } from '@/ui/hooks';
import { clsxm } from '@/ui/utils';

import { FiltersModal } from './FiltersModal';
import { FiltersSidebar } from './FiltersSidebar';

export function Filters() {
  const isMobile = useIsMobile();

  const CompToRender = isMobile ? FiltersModal : FiltersSidebar;

  return (
    <div className={clsxm('bg-surface')}>
      <CompToRender />
    </div>
  );
}
