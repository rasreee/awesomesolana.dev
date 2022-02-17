import { nanoid } from 'nanoid';

import { SearchData } from '@/ui/searchModal';

import { categoriesConst } from './categories';
import { conceptsConst } from './concepts';
import { dependenciesConst } from './dependencies';

export type TagType = 'dependency' | 'concept' | 'category';

export interface TagData extends SearchData {
  id: string;
  title: string;
  count: 0;
  type: TagType;
}

function toTagData(type: TagType) {
  return (title: string): TagData => ({ id: nanoid(), title, type, count: 0 });
}

export const tags: TagData[] = [
  ...dependenciesConst.map(toTagData('dependency')),
  ...categoriesConst.map(toTagData('category')),
  ...conceptsConst.map(toTagData('concept')),
];
