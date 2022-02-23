import { dependencies } from './dependencies';
import { topics } from './topics';
import { ContentTag } from './types';

export function nameToContentTag(
  tagType: ContentTag['type'],
): (tagName: string) => ContentTag {
  return (tagName: string) => ({ name: tagName, type: tagType });
}

export const tags: ContentTag[] = [
  ...topics.map(nameToContentTag('topic')),
  ...dependencies.map(nameToContentTag('dependency')),
];
