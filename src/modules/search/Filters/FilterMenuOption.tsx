import { SearchFilter } from '@/api/filters';
import { getProjectsCountForTag } from '@/api/projects';

export function FilterMenuOption({
  tag,
  onClick,
  checked,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & {
  tag: SearchFilter;
  onClick: () => void;
  checked: boolean;
}) {
  const count = getProjectsCountForTag(tag);

  return (
    <li
      {...props}
      className="flex cursor-pointer items-center justify-between gap-2 px-1 py-2.5"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="bg-app rounded border-none"
          checked={checked}
        />
        <span className="text-sm leading-none">{tag.name}</span>
      </div>
      <span className="bg-surface-2 rounded-lg px-1.5 py-0.5 text-xs leading-none">
        {count}
      </span>
    </li>
  );
}
