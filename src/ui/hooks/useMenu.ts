import { useState } from 'react';

export type UseMenu = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
};

export function useMenu(): UseMenu {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, close, open, toggle };
}
