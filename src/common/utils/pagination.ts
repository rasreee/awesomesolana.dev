export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface PaginationStringParams {
  page: string;
  per_page: string;
}

export const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
  page: 0,
  per_page: 10,
};
export const DEFAULT_PAGINATION_STRING_PARAMS: PaginationStringParams = {
  page: `${DEFAULT_PAGINATION_PARAMS.page}`,
  per_page: `${DEFAULT_PAGINATION_PARAMS.per_page}`,
};
