import { ContentTag } from '@/data/tags';

export type Project = {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  tags: ContentTag[];
};
