import { Project } from '@/data/projects';
import { ContentTag } from '@/data/tags';

import { useSearch } from './SearchContext';

function getTagKey(tag: ContentTag): string {
  return `${tag.type}_${tag.name}`;
}

function getIntersection(a: ContentTag[], b: ContentTag[]): ContentTag[] {
  const result: ContentTag[] = [];
  const bNames = b.map((item) => item.name);

  a.forEach((item) => {
    if (bNames.includes(item.name)) {
      result.push(item);
    }
  });

  return result;
}

export function ProjectItem({ title, description, tags, ...props }: Project) {
  const { search } = useSearch();

  const tagsToShow = search.tags ? getIntersection(search.tags, tags) : tags;

  return (
    <div {...props} className="flex flex-col gap-2 px-5 py-3">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-base">{description}</div>
      <ul>
        {tagsToShow.map((tag) => (
          <li key={getTagKey(tag)}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}
