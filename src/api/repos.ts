import { get } from '@/lib/utils/fetch';

import { apiPrefix as basePrefix } from './constants';
/**
 * @file api/repos
 */

const apiPrefix = `${basePrefix}/qfans`;

export type Article = {
  id: number;
  title: string;
  description: string;
  keywords: string;
  content: string;
};

export function getArticleByID(id: number): Promise<Article> {
  return get(`${apiPrefix}/article/${id}`);
}

export type Keyword = {
  id: string;
  keyword: string;
  description: string;
  keywords: string;
};

export function getRepos(id: string): Promise<Keyword> {
  return get(`${apiPrefix}/keyword/${id}`);
}
