import { Pagination, SourceType } from '@awesomesolana/common';

export interface PopularSourcesRequestParams extends Partial<Pagination> {
  type: SourceType;
}
