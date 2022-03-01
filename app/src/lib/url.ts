import qs from './query-string';

export type UrlParams = {
  [key: string]: string | number | null | undefined;
};

export function urlFor(url: string, params: UrlParams = {}) {
  const querystring = qs.stringify(params, { skipNull: true });
  const sep = url.indexOf('?') >= 0 ? '&' : '?';
  if (querystring) {
    url += sep + querystring;
  }
  return url;
}
