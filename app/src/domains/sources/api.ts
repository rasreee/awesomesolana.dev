import { SourceType } from '@awesomesolana/common';

import { PaginationParams } from '@/lib/pagination';

export interface PopularSourcesRequestParams extends Partial<PaginationParams> {
  type: SourceType;
}
