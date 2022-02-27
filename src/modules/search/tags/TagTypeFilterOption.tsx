import { Tag, tagUtils } from '@core/search';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { CheckBox } from '@/ui/components';

import { useSearchStore } from '../SearchStore';

export const TagTypeFilterOption = observer(function TagTypeFilterOption({
  tag,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & {
  tag: Tag;
  onClick: () => void;
}) {
  const store = useSearchStore();
  const checked = computed(() => tagUtils.list(store.tags).has(tag)).get();

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
      {/* <span className="bg-surface-2 rounded-lg px-1.5 py-0.5 text-xs leading-none">
        {count}
      </span> */}
    </li>
  );
});
