export const TAG_TYPES = [
  'dependency',
  'topic',
  'language',
  'framework',
] as const;

export type TagType = typeof TAG_TYPES[number];

export type ContentTag = {
  name: string;
  type: TagType;
};
