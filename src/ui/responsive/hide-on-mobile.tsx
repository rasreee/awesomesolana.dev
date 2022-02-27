import clsxm from '@/lib/utils/clsxm';

export function HideOnMobile({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsxm('hidden md:block', className)}>{children}</div>;
}
