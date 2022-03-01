export enum SourceType {
  Repo = "repo",
  Article = "article",
}

export interface Source {
  url: string;
  type: SourceType;
  views: Int8;
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
