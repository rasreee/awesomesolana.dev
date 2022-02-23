import { Project } from '@/data/projects';
import { ContentTag, filterTagsByType } from '@/data/tags';

function getTagKey(tag: ContentTag): string {
  return `${tag.type}_${tag.name}`;
}

export function ProjectItem({ title, description, tags, ...props }: Project) {
  return (
    <div {...props}>
      <div className="text-lg font-medium">{title}</div>
      <div className="text-base">{description}</div>
      <div className="flex flex-wrap items-center gap-1">
        {filterTagsByType(tags, 'dependency').map((dependency) => (
          <div key={getTagKey(dependency)}>{dependency.name}</div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {filterTagsByType(tags, 'topic').map((topic) => (
          <div key={getTagKey(topic)}>{topic.name}</div>
        ))}
      </div>
    </div>
  );
}
