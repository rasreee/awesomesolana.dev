import clsxm from '@/lib/clsxm';
import { useIsMobile } from '@/ui/hooks';

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
