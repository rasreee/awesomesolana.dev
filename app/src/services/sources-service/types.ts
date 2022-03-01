import { Pagination, SourceType } from '@awesomesolana/common';

export interface DeleteSourceArgs {
  url: string;
  type: SourceType;
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

export interface GetPopularSourcesArgs extends Partial<Pagination> {
  type: SourceType;
}
