export interface Source {
  id: Int8;
  created_at: TimestampTz;
  type: SourceType;
  tags: string[];
  url: string;
  submitted_by?: UniqueId | null;
}

export type SourceType = 'repo' | 'article';

export interface SourceMeta {
  source_id: Int8;
  views: Int8;
}

export const SOURCES_TABLE = 'sources' as const;
export const SOURCES_META_TABLE = 'sources-meta' as const;
