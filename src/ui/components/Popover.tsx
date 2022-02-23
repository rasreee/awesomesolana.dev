import { useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { EventKeys, useKeyPress } from '@/hooks/useKeyPress';
import clsxm from '@/lib/clsxm';

export function Popover({
  children,
  isOpen,
  onRequestClose,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onRequestClose);

  useKeyPress(EventKeys.ESCAPE, onRequestClose);

  if (!isOpen) return null;

  return (
    <div
      className={clsxm(
        'min-h-0',
        'flex flex-col',
        'rounded-lg',
        'shadow-lg',
        'overflow-hidden',
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
}
