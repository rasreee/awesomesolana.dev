import { Source } from '@/domains/sources/definitions';

export type CreateSourceArgs = Pick<
  Source,
  'type' | 'title' | 'url' | 'submitted_by' | 'tags'
>;

export type FindSourceArgs = Partial<Pick<Source, 'title' | 'type' | 'url'>>;

export type FindOrCreateSourceArgs = Pick<
  Source,
  'type' | 'title' | 'url' | 'submitted_by' | 'tags'
>;

export interface GetSourceMetaArgs {
  source_id: Source['id'];
}
