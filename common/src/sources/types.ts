type Int8 = number;

export enum SourceType {
  Repo = "repo",
  Article = "article",
}

export interface CreateSourceArgs {
  url: string;
  type: SourceType;
}

export interface GetSourceMetaArgs {
  url: string;
  type: SourceType;
}

export interface UpdateSourceArgs {
  url: string;
  type: SourceType;
  views: number;
}

export interface Source {
  url: string;
  type: SourceType;
  views: Int8;
}

export type TagType = "dependency" | "topic" | "language" | "framework";

export type Tag = {
  id: Int8;
  type: TagType;
  /* Primary name the tag is associated with*/
  name: string;
  /* Other names the tag is associated with*/
  aliases?: string[];
};
