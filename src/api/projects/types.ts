import { Tag } from '@/api/tags';

export type Project = {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  tags: Tag[];
};
