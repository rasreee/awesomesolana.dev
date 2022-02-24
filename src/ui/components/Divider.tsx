import clsxm from '@/ui/clsxm';

export function Divider({ className }: { className?: string }) {
  return <div className={clsxm('bg-surface h-[1px]', className)} />;
}
