export type TagType = 'dependency' | 'topic' | 'language' | 'framework';

export type Tag = {
  id: Int8;
  type: TagType;
  /* Primary name the tag is associated with*/
  name: string;
  /* Other names the tag is associated with*/
  aliases?: string[];
};
