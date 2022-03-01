export type TagType = 'dependency' | 'topic' | 'language' | 'framework';

export type Tag = {
  id?: string;
  type?: TagType;
  name: string;
  description?: string;
  sourcesCount?: number;
};
