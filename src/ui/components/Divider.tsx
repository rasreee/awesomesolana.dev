import clsxm from '@utils/clsxm';

export function Divider({ className }: { className?: string }) {
  return <div className={clsxm('bg-surface-1 h-[1px] w-full', className)} />;
}
