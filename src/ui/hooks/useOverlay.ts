import { useState } from 'react';

export type UseOverlay = {
  isOpen: boolean;
  onRequestClose: () => void;
  open: () => void;
  toggle: () => void;
};

export function useOverlay(): UseOverlay {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);

  return { isOpen, onRequestClose, open, toggle };
}
