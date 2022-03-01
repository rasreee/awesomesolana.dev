import { makeTag } from '@awesomesolana/common';
import { Tag } from '@awesomesolana/common';
import React from 'react';

import clsxm from '@/lib/clsxm';
import PlusIcon from '@/ui/icons/plus-icon';

const makeTags = (...args: Omit<Tag, 'id'>[]): Tag[] => {
  return args.map((tag, index) => makeTag({ ...tag, id: index }));
};

const popularTags: Tag[] = makeTags(
  { name: 'nft', type: 'topic' },
  { name: 'did', type: 'topic' },
  { name: 'payment', type: 'topic' },
  { name: 'names', type: 'topic' },
  { name: 'defi', type: 'topic' },
  { name: 'dao', type: 'topic' },
  { name: 'typescript', type: 'language' },
  { name: 'rust', type: 'language' },
  { name: 'nextjs', type: 'language' },
  { name: 'amm', type: 'topic' },
  { name: 'anchor', type: 'framework' },
);

const PopularTags = ({ onSelect }: { onSelect: (tag: Tag) => void }) => {
  const handleClickItem = (tag: Tag) => () => onSelect(tag);

  return (
    <div className="flex flex-col gap-7 py-2 px-5">
      <span className="text-xl font-medium leading-none">Popular tags</span>
      <ul className="flex flex-wrap items-center gap-2">
        {popularTags.map((tag) => (
          <li key={tag.id}>
            <div
              className={clsxm(
                'cursor-pointer',
                'border border-basic-600 bg-basic-600 bg-opacity-10',
                'h-5.5 rounded-full',
                'px-1.5 py-1 pl-3',
                'truncate text-base font-medium leading-none',
                'inline-flex items-center rounded-full',
                'text',
                'hover:border-primary-500 hover:text-primary-500 active:text-primary-600 dark:hover:text-primary-500 dark:active:text-primary-600',
                'gap-1.5',
              )}
              onClick={handleClickItem(tag)}
            >
              <span>{tag.name}</span>
              <PlusIcon className="h-3 w-3 opacity-60" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTags;
