import { Project } from '@/data/projects';
import { ContentTag, getTagKey } from '@/data/tags';
import clsxm from '@/lib/clsxm';

import { FilterTag } from './FilterTag';
import { ProjectItem } from './ProjectItem';
import { useSearch } from './SearchContext';

export function Results({ projects }: { projects: Project[] }) {
  const { search, removeTag } = useSearch();

  const onClickRemove = (tag: ContentTag) => () => removeTag(tag);

  const getIsTagActive = (tag: ContentTag) => {
    return search.tags?.map((t) => t.name).includes(tag.name);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 py-2 px-3">
        <span className="text-sm">
          {projects.length} {projects.length === 1 ? 'result' : 'results'} found
          {search.tags && search.tags.length > 0 ? ` for tag(s):` : ''}
        </span>
        <ul className="flex flex-wrap items-center gap-2">
          {search.tags?.map((tag) => (
            <li key={getTagKey(tag)}>
              <FilterTag
                tag={tag}
                isActive={getIsTagActive(tag)}
                className={clsxm('pr-0.5')}
                onClickRemove={onClickRemove(tag)}
              />
            </li>
          ))}
        </ul>
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectItem {...project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
