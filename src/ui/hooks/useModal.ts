import { useState } from 'react';

export type UseModal = {
  isOpen: boolean;
  onRequestClose: () => void;
  open: () => void;
  toggle: () => void;
};

export function useModal(): UseModal {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);

  return { isOpen, onRequestClose, open, toggle };
}
