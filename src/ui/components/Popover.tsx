import { useRef } from 'react';

import { useClickOutside } from '@/ui/hooks';
import { clsxm } from '@/ui/utils';

export function Popover({
  children,
  isOpen,
  onRequestClose,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onRequestClose);

  if (!isOpen) return null;

  return (
    <div
      className={clsxm(
        'min-h-0',
        'flex flex-col',
        'rounded-lg',
        'shadow-lg',
        'overflow-hidden',
        'absolute z-50',
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
}
