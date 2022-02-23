import React, { useState } from 'react';

import clsxm from '@/lib/clsxm';
import { ContentTag } from '@/modules/tags';
import { Popover, Tag } from '@/ui/components';

import { useSearch } from './SearchContext';

export const DependenciesMenu = () => {
  const { search, removeTag } = useSearch();

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);

  const closeMenu = () => setOpen(false);

  const onRemoveClick = (tag: ContentTag) => () => {
    removeTag(tag);
  };

  const dependencies: ContentTag[] | undefined = search.tags?.filter(
    (tag) => tag.type === 'dependency',
  );

  if (!dependencies) return null;

  return (
    <div>
      <button
        onClick={openMenu}
        className={clsxm(
          open && 'border border-base-400 dark:border-base-400',
          'bg-surface-1 flex items-center gap-3 rounded-xl bg-opacity-50 px-4 py-2 hover:bg-opacity-80 active:bg-opacity-100',
        )}
      >
        <span>Dependencies</span>
        <div className="bg-surface-2 flex h-6 w-6 items-center justify-center rounded-full">
          <span className="my-auto text-base font-medium leading-none">
            {dependencies.length ?? 0}
          </span>
        </div>
      </button>
      <Popover
        className="bg-surface mt-2 max-w-fit px-2 py-3"
        isOpen={open}
        onRequestClose={closeMenu}
      >
        <ul className={clsxm('flex flex-wrap items-center gap-3')}>
          {dependencies.map((tag) => (
            <li key={tag.name}>
              <Tag onClickRemove={onRemoveClick(tag)}>{tag.name}</Tag>
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  );
};
