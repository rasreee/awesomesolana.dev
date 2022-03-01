export interface Source {
  id: Int8;
  created_at: TimestampTz;
  type: SourceType;
  tags: string[];
  title: string;
  url: string;
  submitted_by?: UniqueId | null;
}

export enum SourceType {
  Repo = 'repo',
  Article = 'article',
}

export interface SourceMeta {
  source_id: Int8;
  views: Int8;
}

export const SOURCE_TABLE = 'sources' as const;
export const SOURCE_META_TABLE = 'sources-meta' as const;
