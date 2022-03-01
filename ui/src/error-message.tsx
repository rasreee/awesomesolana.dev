import { clsxm } from "@awesomesolana/tw";

export function ErrorMessage({
  children,
}: {
  children: string | string[] | undefined | null;
}) {
  if (!children) return null;

  return (
    <div
      className={clsxm(
        "text-lg leading-normal text-red-600",
        "flex items-start gap-2"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{children}</span>
    </div>
  );
}
