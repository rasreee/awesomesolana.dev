import { SearchFilter } from '@/api/filters';
import { Project } from '@/api/projects';
import { useSearch } from '@/contexts/search';

import { FilterTag } from './FilterTag';

export function ProjectItem({ title, description, tags, ...props }: Project) {
  const { search, addFilter, removeFilter } = useSearch();

  const getIsTagActive = (tag: SearchFilter) => {
    return search.tags?.map((t) => t.name).includes(tag.name);
  };

  const onClickTag = (tag: SearchFilter) => () => {
    if (getIsTagActive(tag)) return removeFilter(tag);

    addFilter(tag);
  };

  return (
    <div className="bg-surface rounded bg-opacity-70">
      <div {...props} className="flex flex-col gap-2 px-3 py-3">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-base">{description}</div>
        <ul className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <li key={`${tag.type}_${tag.name}`}>
              <FilterTag
                isActive={getIsTagActive(tag)}
                tag={tag}
                onClick={onClickTag(tag)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
