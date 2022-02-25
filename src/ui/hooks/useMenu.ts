import { useState } from 'react';

export function useMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, close, open, toggle };
}
