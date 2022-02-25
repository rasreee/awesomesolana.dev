import {
  useGetIsFilterActive,
  useToggleFilter,
} from '@/contexts/SearchContext';
import { Project } from '@/modules/projects';
import { Tag } from '@/modules/tags';

import { FilterTag } from './FilterTag';

export function ProjectItem({ title, description, tags, ...props }: Project) {
  const getIsFilterActive = useGetIsFilterActive();
  const toggleFilter = useToggleFilter();

  const handleToggleFilter = (tag: Tag) => () => toggleFilter(tag);

  return (
    <div className="bg-surface rounded bg-opacity-70">
      <div {...props} className="flex flex-col gap-2 px-3 py-3">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-base">{description}</div>
        <ul className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <li key={`${tag.category}_${tag.name}`}>
              <FilterTag
                isActive={getIsFilterActive(tag)}
                tag={tag}
                onClick={handleToggleFilter(tag)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
