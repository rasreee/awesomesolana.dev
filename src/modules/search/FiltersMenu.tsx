import { Popover } from '@/ui/components';
import { useIsMobile } from '@/ui/hooks';
import { clsxm } from '@/ui/utils';

import { Filters, MobileFilters } from './Filters';

export function FiltersMenu({
  onRequestClose,
  isOpen,
}: {
  onRequestClose: () => void;
  isOpen: boolean;
}) {
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  if (isMobile)
    return (
      <>
        <Popover
          className="bg-surface fixed top-20 bottom-20 right-5 left-5 my-auto min-h-[60vh] max-w-full flex-1"
          isOpen={isOpen}
          onRequestClose={onRequestClose}
        >
          <MobileFilters onRequestClose={onRequestClose} />
        </Popover>
      </>
    );

  return (
    <div className={clsxm('bg-surface rounded-md', 'w-4/12')}>
      <Filters />
    </div>
  );
}
