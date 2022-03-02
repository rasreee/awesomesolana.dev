import { TagType } from '@awesomesolana/common';
import { clsxm } from '@awesomesolana/tw';
import { useState } from 'react';

import Popover from '@/ui/popover';

import FiltersBar from './filters-bar';
import FiltersMenu from './filters-menu';

const FiltersPopover = ({
  activeItem,
  onClose,
}: {
  activeItem: TagType | null;
  onClose: () => void;
}) => {
  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      onClose={onClose}
      isOpen={Boolean(activeItem)}
    >
      {activeItem && <FiltersMenu type={activeItem} onClose={onClose} />}
    </Popover>
  );
};

const FiltersControls = function FiltersControls() {
  const [activeTagType, setTagType] = useState<TagType | null>(null);

  const getIsActiveItem = (tagType: TagType) => activeTagType === tagType;

  return (
    <>
      <FiltersBar onSelect={setTagType} getIsActiveItem={getIsActiveItem} />
      <FiltersPopover
        activeItem={activeTagType}
        onClose={() => setTagType(null)}
      />
    </>
  );
};

export default FiltersControls;
