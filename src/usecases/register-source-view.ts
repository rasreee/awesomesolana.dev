import { SourceType } from '@/domains/sources/definitions';

export interface RegisterSourceViewArgs {
  title: string;
  type: SourceType;
  url: string;
  tags: string[];
}
