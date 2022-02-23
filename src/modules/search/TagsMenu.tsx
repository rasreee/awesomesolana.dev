import { useState } from 'react';

import { allTagsByType, ContentTag, TAG_TYPE_TO_PLURAL } from '@/data/tags';
import { capitalizeFirst } from '@/lib/capitalizeFirst';
import clsxm from '@/lib/clsxm';
import { Popover, Tag } from '@/ui/components';

import { useSearch } from './SearchContext';

type TagsMenuProps = { type: ContentTag['type'] };

export const TagsMenu = ({ type }: TagsMenuProps) => {
  const { search, removeTag } = useSearch();

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);

  const closeMenu = () => setOpen(false);

  const onRemoveClick = (tag: ContentTag) => () => {
    removeTag(tag);
    closeMenu();
  };

  return (
    <>
      <button
        onClick={openMenu}
        className={clsxm(
          open && 'border border-base-400 dark:border-base-400',
          search.tags?.map((tag) => tag.type).includes(type)
            ? 'text'
            : 'text-hint',
          'bg-surface flex w-full items-center justify-between gap-3 rounded-md bg-opacity-70 px-4 py-2 hover:bg-opacity-90 active:bg-opacity-100',
        )}
      >
        <span className="text-base leading-none">
          {capitalizeFirst(TAG_TYPE_TO_PLURAL[type])}
        </span>
        <div className="bg-surface-2 flex h-5 w-5 items-center justify-center rounded-full">
          <span className="my-auto text-xs font-medium leading-none">
            {search.tags?.length ?? 0}
          </span>
        </div>
      </button>
      <Popover
        className="bg-surface mt-2 max-w-fit px-2 py-3"
        isOpen={open}
        onRequestClose={closeMenu}
      >
        <ul className={clsxm('flex flex-wrap items-center gap-3')}>
          {allTagsByType(type).map((tag) => (
            <li key={tag.name}>
              <Tag onClickRemove={onRemoveClick(tag)}>{tag.name}</Tag>
            </li>
          ))}
        </ul>
      </Popover>
    </>
  );
};
