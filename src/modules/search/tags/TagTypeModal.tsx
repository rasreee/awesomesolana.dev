import clsxm from '@utils/clsxm';
import { observer } from 'mobx-react-lite';

import { Popover } from '@/ui/components';

import { useSearchStore } from '../SearchStore';
import { TagTypeMenu } from './TagTypeMenu';

export const TagTypeModal = observer(function TagTypeModal() {
  const searchStore = useSearchStore();

  if (!searchStore.tagTypeModal) return null;

  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      onClose={searchStore.closeTagTypeModal}
      isOpen={Boolean(searchStore.tagTypeModal)}
    >
      <TagTypeMenu type={searchStore.tagTypeModal} />
    </Popover>
  );
});
