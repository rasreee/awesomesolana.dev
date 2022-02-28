import { Tag } from '@/modules/tags/types';

export type SearchFormData = {
  query: string;
  filters: Tag[];
};
