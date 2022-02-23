import invariant from '@/lib/invariant';

import { tags } from './constants';
import { ContentTag } from './types';

export function getContentTag(tagName: string): ContentTag {
  const found = tags.find((tag) => tag.name === tagName);
  invariant(found, `tag not found for name: ${tagName}`);
  return found;
}

export function searchTags(
  query: string,
  predicate?: (tag: ContentTag) => boolean,
): ContentTag[] {
  if (!query) return [];

  let hits = [] as ContentTag[];

  const a = query.toLowerCase();

  const tagsToSearch = predicate ? tags.filter(predicate) : tags;

  hits = tagsToSearch.filter((item) => {
    const name = item.name;
    const b = name.toLowerCase().slice(0, query.length);

    return a === b;
  });

  return hits;
}

export function filterTagsByType(
  tags: ContentTag[],
  type: ContentTag['type'],
): ContentTag[] {
  return tags.filter((tag) => tag.type === type);
}

export const TAG_TYPE_TO_PLURAL = {
  dependency: 'dependencies',
  topic: 'topics',
  language: 'languages',
  framework: 'frameworks',
};

type GroupedTags = Array<{ type: ContentTag['type']; tags: ContentTag[] }>;

export function groupTagsByType(tags: ContentTag[]): GroupedTags {
  return [
    { type: 'dependency', tags: filterTagsByType(tags, 'dependency') },
    { type: 'topic', tags: filterTagsByType(tags, 'topic') },
  ];
}

export function allTagsByType(type: ContentTag['type']): ContentTag[] {
  return filterTagsByType(tags, type);
}

export function getTagKey(tag: ContentTag): string {
  return `${tag.type}_${tag.name}`;
}
