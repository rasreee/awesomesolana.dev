import clsxm from '@utils/clsxm';
import { ComponentType } from 'react';

import { useIsMobile } from '@/ui/hooks';

export function HideOnMobile({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsxm('hidden md:block', className)}>{children}</div>;
}

export function OnlyMobile({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsxm('md:hidden', className)}>{children}</div>;
}

export function ResponsiveRender<P = {}>({
  mobile: Small,
  aboveMobile: AboveMobile,
  props = {} as P,
}: {
  mobile: ComponentType<P>;
  aboveMobile: ComponentType<P>;
  props?: P;
}) {
  const isMobile = useIsMobile();

  if (isMobile) return <Small {...props} />;

  return <AboveMobile {...props} />;
}
