export type TagType = 'dependency' | 'topic' | 'language' | 'framework';

export type Tag = {
  type: TagType;
  name: string;
};

export type SearchFormData = {
  query: string;
  filters: Tag[];
};
