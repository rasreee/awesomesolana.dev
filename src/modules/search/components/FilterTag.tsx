import { ReactNode } from 'react';

import clsxm from '@/lib/clsxm';
import { Tag } from '@/modules/tags';

export function FilterTag({
  tag,
  className,
  isActive,
  onClick,
  postFix = null,
}: {
  tag: Tag;
  className?: string;
  isActive?: boolean;
  postFix?: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className={clsxm(
        'cursor-pointer',
        'py-0.5 px-2.5',
        'rounded-md',
        'flex items-center justify-between gap-1',
        'w-max max-w-[14rem] overflow-hidden',
        'font-medium',
        'flex-1',
        isActive
          ? 'bg-color-primary text-white'
          : 'bg-surface-2 text text-opacity-90',
        className,
      )}
      onClick={onClick}
    >
      <span
        className={clsxm(isActive && 'text-white', 'text truncate text-sm')}
      >
        {tag.name}
      </span>
      {postFix}
    </div>
  );
}
