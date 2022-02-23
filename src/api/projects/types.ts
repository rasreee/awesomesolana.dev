import { SearchFilter } from '@/api/filters';

export type Project = {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  tags: SearchFilter[];
};
