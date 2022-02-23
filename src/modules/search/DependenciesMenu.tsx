import React, { useState } from 'react';

import clsxm from '@/lib/clsxm';
import { Popover, Tag } from '@/ui/components';

import { useSearch } from './SearchContext';
import { ContentTag } from './tags';

export const DependenciesMenu = () => {
  const { search, removeTag } = useSearch();

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);

  const closeMenu = () => setOpen(false);

  const onRemoveClick = (tag: ContentTag) => () => {
    removeTag(tag);
  };

  const dependencies: ContentTag[] =
    search.tags?.filter((tag) => tag.type === 'dependency') ?? [];

  return (
    <>
      <button
        onClick={openMenu}
        className="bg-surface-1 flex items-center gap-3 rounded-xl bg-opacity-50 px-4 py-2 hover:bg-opacity-80 active:bg-opacity-100"
      >
        <span>Dependencies</span>
        <div className="bg-surface-2 flex h-6 w-6 items-center justify-center rounded-full">
          <span className="my-auto text-base font-medium leading-none">
            {dependencies.length ?? 0}
          </span>
        </div>
      </button>
      <Popover isOpen={open} onRequestClose={closeMenu}>
        <ul className={clsxm('flex flex-wrap items-center gap-3')}>
          {dependencies.map((tag) => (
            <li key={tag.name}>
              <Tag onClickRemove={onRemoveClick(tag)}>{tag.name}</Tag>
            </li>
          ))}
        </ul>
      </Popover>
    </>
  );
};
