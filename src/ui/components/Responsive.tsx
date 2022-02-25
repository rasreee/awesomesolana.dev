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

export function ResponsiveRender({
  mobile: Small,
  aboveMobile: AboveMobile,
}: {
  mobile: ComponentType;
  aboveMobile: ComponentType;
}) {
  const isMobile = useIsMobile();

  if (isMobile) return <Small />;

  return <AboveMobile />;
}
