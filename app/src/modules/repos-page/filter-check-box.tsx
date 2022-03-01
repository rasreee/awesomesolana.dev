import { tagUtils } from '@awesomesolana/common';
import { Tag } from '@awesomesolana/common';
import React from 'react';

import { useSearchQuery } from '@/contexts/search-query-context';
import { CheckBox } from '@/ui/check-box';

const RepoFilterCheckBox = function RepoFilterCheckBox({
  tag,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & {
  tag: Tag;
}) {
  const { tags, toggleTag } = useSearchQuery();
  const checked = tagUtils.list(tags).has(tag);

  const handleClick = () => toggleTag(tag);

  return (
    <li
      {...props}
      className="flex cursor-pointer items-center justify-between gap-2 px-1 py-2.5"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <CheckBox checked={checked} readOnly />
        <span className="text-sm leading-none">{tag.name}</span>
      </div>
    </li>
  );
};

export default RepoFilterCheckBox;
