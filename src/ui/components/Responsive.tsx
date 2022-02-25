import { ComponentType } from 'react';

import clsxm from '@/lib/clsxm';
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

export function ResponsiveRender<P = any>({
  mobile: Small,
  aboveMobile: AboveMobile,
  props,
}: {
  mobile: ComponentType<P>;
  aboveMobile: ComponentType<P>;
  props: P;
}) {
  const isMobile = useIsMobile();

  if (isMobile) return <Small {...props} />;

  return <AboveMobile {...props} />;
}
