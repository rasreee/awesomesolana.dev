import { FC, ReactNode, useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { EventKeys, useKeyPress } from '@/hooks/useKeyPress';
import clsxm from '@/lib/clsxm';

import * as S from './styles';

export interface ModalProps {
  /**
   * Indicates whether modal is visible or not
   */
  isOpen: boolean;
  /**
   * Handler to call when modal should be closed
   */
  onRequestClose: () => void;
  /**
   * Children of modal
   */
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onRequestClose);

  useKeyPress(EventKeys.ESCAPE, onRequestClose);

  if (!isOpen) return null;

  return (
    <S.Backdrop>
      <div
        className={clsxm(
          'm-auto min-h-0 w-full max-w-[90%] md:max-w-[46rem]',
          'flex flex-col',
          'rounded-lg',
          'shadow-md',
          'bg-white dark:bg-base-700',
          'overflow-hidden',
        )}
        ref={ref}
      >
        {children}
      </div>
    </S.Backdrop>
  );
};
