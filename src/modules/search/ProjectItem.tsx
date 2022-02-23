import { Project } from '@/data/projects';
import { ContentTag, getTagKey } from '@/data/tags';
import clsxm from '@/lib/clsxm';

import { useSearch } from './SearchContext';

export function ProjectItem({ title, description, tags, ...props }: Project) {
  const { search } = useSearch();

  const getIsTagActive = (tag: ContentTag) => {
    return search.tags?.map((t) => t.name).includes(tag.name);
  };

  return (
    <div {...props} className="flex flex-col gap-2 px-5 py-3">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-base">{description}</div>
      <ul className="flex flex-wrap items-center gap-1.5">
        {tags.map((tag) => (
          <li key={getTagKey(tag)}>
            <div
              className={clsxm(
                getIsTagActive(tag)
                  ? 'bg-surface-1 font-medium'
                  : 'bg-surface bg-opacity-80',
                'py-0.5 pl-2.5 pr-2.5',
                'rounded-md',
                'flex items-center justify-between gap-1',
                'min-w-max max-w-min',
                'text-sm',
              )}
            >
              {tag.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
