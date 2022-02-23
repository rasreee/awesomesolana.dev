import { Project } from '@/data/projects';
import { ContentTag, getTagKey } from '@/data/tags';

import { FilterTag } from './FilterTag';
import { useSearch } from './SearchContext';

export function ProjectItem({ title, description, tags, ...props }: Project) {
  const { search } = useSearch();

  const getIsTagActive = (tag: ContentTag) => {
    return search.tags?.map((t) => t.name).includes(tag.name);
  };

  return (
    <div {...props} className="flex flex-col gap-2 px-3 py-3">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-base">{description}</div>
      <ul className="flex flex-wrap items-center gap-1.5">
        {tags.map((tag) => (
          <li key={getTagKey(tag)}>
            <FilterTag isActive={getIsTagActive(tag)} tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}
