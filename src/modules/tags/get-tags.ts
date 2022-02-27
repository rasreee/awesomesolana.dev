import { allTags } from './constants';
import { Tag, TagType } from './types';

export async function getTags(
  type?: TagType | undefined | null,
): Promise<Tag[]> {
  if (!type) return allTags;

  return allTags.filter((tag) => tag.type === type);
}
