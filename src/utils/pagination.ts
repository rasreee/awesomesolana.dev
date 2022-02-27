export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface PaginationStringParams {
  page: string;
  per_page: string;
}

export const defaultPaginationParams: PaginationParams = Object.freeze({
  page: 0,
  per_page: 10,
});

export const defaultPaginationStringParams: PaginationStringParams =
  Object.freeze({
    page: `${defaultPaginationParams.page}`,
    per_page: `${defaultPaginationParams.per_page}`,
  });
