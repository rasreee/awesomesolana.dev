import clsxm from '@utils/clsxm';
import { forwardRef, HTMLAttributes, Ref } from 'react';

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Overlay = forwardRef(
  (
    { children, className, ...props }: OverlayProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        className={clsxm(
          'flex flex-col',
          'rounded-lg',
          'shadow-lg',
          'overflow-hidden',
          'absolute z-50',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
