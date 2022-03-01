import { PaginationParams } from '@/lib/pagination';

import { SourceType } from './definitions';

export interface PopularSourcesRequestParams extends Partial<PaginationParams> {
  type: SourceType;
}
