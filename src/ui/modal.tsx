import { FC, ReactNode, useRef } from 'react';

import clsxm from '@/lib/clsxm';
import { useClickOutside } from '@/ui/hooks/use-click-outside';
import { EventKeys, useKeyPress } from '@/ui/hooks/use-key-press';

export interface ModalProps {
  /**
   * Indicates whether modal is visible or not
   */
  isOpen: boolean;
  /**
   * Handler to call when modal should be closed
   */
  onClose: () => void;
  /**
   * Children of modal
   */
  children: ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onClose);

  useKeyPress(EventKeys.ESCAPE, onClose);

  if (!isOpen) return null;

  return (
    <div
      className={clsxm(
        'h-screen w-screen',
        'fixed left-0 top-0 z-50',
        'bg-[rgba(0, 0, 0, 0.25)] flex flex-col',
        'md:p-[10vh]',
      )}
    >
      <div
        className={clsxm(
          'mx-auto min-h-0 w-full max-w-[90%] md:max-w-[46rem]',
          'flex flex-col',
          'rounded-lg',
          'shadow-lg',
          'bg-surface',
          'overflow-hidden',
          className,
        )}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};
