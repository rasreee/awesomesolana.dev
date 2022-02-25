import { Tag } from '@/modules/tags';

export type Project = {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  tags: Tag[];
};
