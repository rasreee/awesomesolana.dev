import React from 'react';

import { Tag } from '@/domains/tags/tags.types';
import { makeTag } from '@/domains/tags/tags.utils';
import BasicOutlineBadge from '@/ui/basic-outline-badge';

const makeTags = (...args: Tag[]): Tag[] => {
  return args.map(makeTag);
};

const popularTags: Tag[] = makeTags(
  { name: 'nft' },
  { name: 'did' },
  { name: 'payment' },
  { name: 'names' },
  { name: 'defi' },
  { name: 'dao' },
  { name: 'typescript' },
  { name: 'rust' },
  { name: 'nextjs' },
  { name: 'amm' },
  { name: 'anchor' },
);

const PopularTags = ({ onSelect }: { onSelect: (tag: Tag) => void }) => {
  const handleClickItem = (tag: Tag) => () => onSelect(tag);

  return (
    <div className="flex flex-col gap-7 py-2 px-5">
      <span className="text-xl font-medium leading-none">Popular tags</span>
      <ul className="flex flex-wrap items-center gap-2">
        {popularTags.map((tag) => (
          <li key={tag.id}>
            <BasicOutlineBadge className="py-3" onClick={handleClickItem(tag)}>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 py-2">
                  <span className="text text-base font-medium leading-none text-opacity-80">
                    {tag.name}
                  </span>
                  {' · '}
                  <span className="text-hint text-xs leading-none">
                    {tag.sourcesCount}
                  </span>
                </div>
                {tag.description && (
                  <div className="text-body text-sm">{tag.description}</div>
                )}
              </div>
            </BasicOutlineBadge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTags;
