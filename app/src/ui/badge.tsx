import { clsxm } from '@awesomesolana/tw';
import React from 'react';

export type BadgeProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLSpanElement>
>;

function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={clsxm(
        'truncate text-xs leading-none',
        'bg-white dark:bg-indigo-100',
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
