import { useClickOutside } from '@awesomesolana/hooks';
import React, { HTMLAttributes, useRef } from 'react';

import { Overlay } from './overlay';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  className?: string;
}

function Popover({
  children,
  isOpen = true,
  onClose,
  className,
  ...props
}: PopoverProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onClose);

  if (!isOpen) return null;

  return (
    <Overlay ref={ref} className={className} {...props}>
      {children}
    </Overlay>
  );
}

export default Popover;
