import clsxm from '@/lib/clsxm';

export function OnlyMobile({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsxm('md:hidden', className)}>{children}</div>;
}
