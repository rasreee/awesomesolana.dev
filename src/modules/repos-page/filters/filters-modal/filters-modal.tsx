import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import clsxm from '@/lib/utils/clsxm';
import { useGlobalStore } from '@/stores';
import Popover from '@/ui/popover';

const FiltersMenu = dynamic(() => import('./filters-menu'));

const FiltersModal = observer(function FiltersModal() {
  const { tagTypeModal } = useGlobalStore();

  if (!tagTypeModal.isOpen) return null;

  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      onClose={tagTypeModal.onClose}
      isOpen={tagTypeModal.isOpen}
    >
      {tagTypeModal.tagType && <FiltersMenu type={tagTypeModal.tagType} />}
    </Popover>
  );
});

export default FiltersModal;
