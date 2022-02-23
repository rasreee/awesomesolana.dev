import { useState } from 'react';

import { capitalizeFirst } from '@/lib/capitalizeFirst';
import clsxm from '@/lib/clsxm';
import { ContentTag, TAG_TYPE_TO_PLURAL } from '@/modules/tags';
import { Popover, Tag } from '@/ui/components';

import { useSearch } from './SearchContext';

type TagsMenuProps = { type: ContentTag['type']; tags: ContentTag[] };

export const TagsMenu = ({ type, tags }: TagsMenuProps) => {
  const { removeTag } = useSearch();

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
        disabled={tags.length === 0}
        className={clsxm(
          open && 'border border-base-400 dark:border-base-400',
          'bg-surface-1 flex items-center gap-3 rounded-xl bg-opacity-50 px-4 py-2 hover:bg-opacity-80 active:bg-opacity-100',
        )}
      >
        <span>{capitalizeFirst(TAG_TYPE_TO_PLURAL[type])}</span>
        <div className="bg-surface-2 flex h-6 w-6 items-center justify-center rounded-full">
          <span className="my-auto text-base font-medium leading-none">
            {tags.length ?? 0}
          </span>
        </div>
      </button>
      <Popover
        className="bg-surface mt-2 max-w-fit px-2 py-3"
        isOpen={open}
        onRequestClose={closeMenu}
      >
        <ul className={clsxm('flex flex-wrap items-center gap-3')}>
          {tags.map((tag) => (
            <li key={tag.name}>
              <Tag onClickRemove={onRemoveClick(tag)}>{tag.name}</Tag>
            </li>
          ))}
        </ul>
      </Popover>
    </>
  );
};
