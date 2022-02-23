import { SearchFilter } from '@/api/filters';

export type Search = {
  query?: string;
  tags?: SearchFilter[];
};
