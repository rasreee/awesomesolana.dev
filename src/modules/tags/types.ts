export type FilterCategory = 'dependency' | 'topic' | 'language' | 'framework';

export type Tag = {
  category: FilterCategory;
  name: string;
};
