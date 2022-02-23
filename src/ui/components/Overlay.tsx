import clsxm from '@/lib/clsxm';

export function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsxm(
        'fixed left-0 top-0 z-50',
        'h-screen w-screen',
        'pointer-events-none',
      )}
    >
      {children}
    </div>
  );
}
