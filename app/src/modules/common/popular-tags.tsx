import React from 'react';

import { makeTag } from '@/domains/tags/tags.utils';
import { Tag } from '@/domains/tags/types';
import BasicOutlineBadge from '@/ui/basic-outline-badge';

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
            <BasicOutlineBadge className="py-3" onClick={handleClickItem(tag)}>
              <span className="text text-base font-medium leading-none text-opacity-80">
                {tag.name}
              </span>
            </BasicOutlineBadge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTags;
