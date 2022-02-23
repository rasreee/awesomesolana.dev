import { Project } from '@/data/projects';
import { ContentTag } from '@/data/tags';
import { Tag } from '@/ui/components';

import { ProjectItem } from './ProjectItem';
import { useSearch } from './SearchContext';

export function Results({ projects }: { projects: Project[] }) {
  const { removeTag } = useSearch();
  const onClickRemove = (tag: ContentTag) => () => removeTag(tag);
  const { search } = useSearch();
  return (
    <div>
      <div className="flex flex-col gap-2 px-5 py-2">
        <span className="text-sm">
          {projects.length} {projects.length === 1 ? 'result' : 'results'} found
          {search.tags && search.tags.length > 0 ? ` for tag(s):` : ''}
        </span>
        <ul className="flex flex-wrap items-center gap-2">
          {search.tags?.map((tag) => (
            <Tag key={tag.name} onClickRemove={onClickRemove(tag)}>
              {tag.name}
            </Tag>
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
