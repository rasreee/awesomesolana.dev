import invariant from '@/lib/invariant';

import { tags } from './constants';
import { ContentTag } from './types';

export function getContentTag(tagName: string): ContentTag {
  const found = tags.find((tag) => tag.name === tagName);
  invariant(found, `tag not found for name: ${tagName}`);
  return found;
}

export async function searchTags(query: string): Promise<ContentTag[]> {
  if (!query) return Promise.resolve([]);

  let hits = [] as ContentTag[];

  const a = query.toLowerCase();

  hits = tags.filter((item) => {
    const name = item.name;
    const b = name.toLowerCase().slice(0, query.length);

    return a === b;
  });

  console.table(hits);

  return Promise.resolve(hits);
}

export function tagsByType(
  tags: ContentTag[],
  type: ContentTag['type'],
): ContentTag[] {
  return tags.filter((tag) => tag.type === type);
}

export const TAG_TYPE_TO_PLURAL = {
  dependency: 'dependencies',
  topic: 'topics',
};
