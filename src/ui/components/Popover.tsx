import React, { HTMLAttributes, useRef } from 'react';

import { useClickOutside } from '@/ui/hooks';

import { Overlay } from './Overlay';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isOpen?: boolean;
  onRequestClose: () => void;
  className?: string;
}

export function Popover({
  children,
  isOpen = true,
  onRequestClose,
  className,
  ...props
}: PopoverProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onRequestClose);

  if (!isOpen) return null;

  return (
    <Overlay ref={ref} className={className} {...props}>
      {children}
    </Overlay>
  );
}
