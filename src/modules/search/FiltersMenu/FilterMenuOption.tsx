import React from 'react';

import { getProjectsCountForTag } from '@/api/projects';
import { Tag } from '@/api/tags';
import { CheckBox } from '@/ui/components';

export function FilterMenuOption({
  tag,
  onClick,
  checked,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & {
  tag: Tag;
  onClick: () => void;
  checked: boolean;
}) {
  const count = getProjectsCountForTag(tag);

  return (
    <li
      {...props}
      className="flex cursor-pointer items-center justify-between gap-2 px-1 py-2.5"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <CheckBox checked={checked} readOnly />
        <span className="text-sm leading-none">{tag.name}</span>
      </div>
      <span className="bg-surface-2 rounded-lg px-1.5 py-0.5 text-xs leading-none">
        {count}
      </span>
    </li>
  );
}
