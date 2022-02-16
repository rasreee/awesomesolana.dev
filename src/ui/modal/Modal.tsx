import React, { FC, ReactNode, useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { EventKeys, useKeyPress } from '@/hooks/useKeyPress';

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
      <S.Container ref={ref}>{children}</S.Container>
    </S.Backdrop>
  );
};
