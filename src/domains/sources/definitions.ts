export enum SourceType {
  Repo = 'repo',
  Article = 'article',
}

export interface Source {
  url: string;
  type: SourceType;
  views: Int8;
}

export const SOURCE_TABLE = 'sources' as const;
