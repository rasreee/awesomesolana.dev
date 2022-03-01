export function ErrorMessage({
  children,
}: {
  children: string | undefined | null;
}) {
  if (!children) return null;

  return <div className="text-base text-red-600">{children}</div>;
}
