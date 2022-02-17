import { nanoid } from 'nanoid';

import { SearchData } from '@/ui/searchModal';

import sourcesJson from './sources.json';

export type ContentType = 'tutorial';

export interface SourceData extends SearchData {
  url: string;
  type: ContentType;
}

export const sources: SourceData[] = [
  ...(sourcesJson as Omit<SourceData, 'id'>[]).map((data) => ({
    ...data,
    id: nanoid(),
  })),
];
