import { useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { EventKeys, useKeyPress } from '@/hooks/useKeyPress';
import clsxm from '@/lib/clsxm';

export function Popover({
  children,
  isOpen,
  onRequestClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onRequestClose);

  useKeyPress(EventKeys.ESCAPE, onRequestClose);

  if (!isOpen) return null;

  return (
    <div
      className={clsxm(
        'mx-auto min-h-0 w-full max-w-[90%] md:max-w-[46rem]',
        'flex flex-col',
        'rounded-lg',
        'shadow-lg',
        'bg-surface',
        'overflow-hidden',
      )}
      ref={ref}
    >
      {children}
    </div>
  );
}
