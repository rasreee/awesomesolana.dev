import { useState } from 'react';

export type UseOverlay = {
  isOpen: boolean;
  onClose: () => void;
  open: () => void;
  toggle: () => void;
};

export function useOverlay(): UseOverlay {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen, onClose, open, toggle };
}
