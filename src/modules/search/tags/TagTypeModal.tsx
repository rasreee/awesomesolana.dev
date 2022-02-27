import clsxm from '@utils/clsxm';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { useRootStore } from '@/stores/root-store';
import Popover from '@/ui/components/Popover';

const TagTypeMenu = dynamic(() => import('./TagTypeMenu'));

const TagTypeModal = observer(function TagTypeModal() {
  const { tagTypeModal } = useRootStore();

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
      {tagTypeModal.tagType && <TagTypeMenu type={tagTypeModal.tagType} />}
    </Popover>
  );
});

export default TagTypeModal;
