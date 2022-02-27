import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import clsxm from '@/lib/utils/clsxm';
import { useRootStore } from '@/stores/root-store';
import Popover from '@/ui/popover';

const RepoFilterTypeMenu = dynamic(() => import('./repo-filter-type-menu'));

const RepoFilterTypeModal = observer(function RepoFilterTypeModal() {
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
      {tagTypeModal.tagType && (
        <RepoFilterTypeMenu type={tagTypeModal.tagType} />
      )}
    </Popover>
  );
});

export default RepoFilterTypeModal;
