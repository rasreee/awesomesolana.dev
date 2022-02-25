export type FilterCategory =
  | 'npm-dependency'
  | 'cargo-dependency'
  | 'topic'
  | 'language'
  | 'framework';

export type Tag = {
  category: FilterCategory;
  name: string;
};
