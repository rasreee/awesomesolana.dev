import type { ParsedUrlQuery } from 'querystring';

function normalizeQueryParam(param: string | string[] | undefined): string {
  return param ? (param as string) : '';
}

/**
 * Parse query from urls like :
 * - `[owner]/[repository]`
 */
export function parseGithubQuery(query: ParsedUrlQuery): {
  owner: string;
  repositoryName: string;
} {
  return {
    owner: normalizeQueryParam(query.owner),
    repositoryName: normalizeQueryParam(query.repositoryName),
  };
}
