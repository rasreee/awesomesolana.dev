import { host } from '@/app/env';

import { isBrowser } from './env';
import { urlFor, UrlParams } from './url';

export class ApiException<T> extends Error {
  response: { data: T };
  constructor(public data: T, public message: string) {
    super(message);
    this.response = { data };
  }
}

export async function fetchJSON(info: RequestInfo, init?: RequestInit) {
  const fetched = await fetch(info, {
    credentials: 'include',
    mode: 'cors',
    ...init,
    headers: {
      // 为服务端渲染时发出的请求添加 Referer 信息，以免被 API proxy 拒掉
      ...(isBrowser() ? null : { Referer: host }),
      'Content-Type': 'application/json',
      ...(init && init.headers),
    },
  });

  const body = await fetched.text();

  if (!fetched.ok) {
    let data: any = null;
    try {
      data = parseBody(body);
    } catch {
      /** do nothing */
    }
    throw new ApiException(data, `Fetch failed with status ${fetched.status}.`);
  }

  try {
    return parseBody(body);
  } catch (e) {
    throw new Error('Fetch failed with invalid response.');
  }
}

function parseBody(body: string) {
  // 兼容 body 为空的情况
  if (!body.trim()) {
    return null;
  }
  return JSON.parse(body);
}

export function get(url: string, params?: UrlParams, init?: RequestInit) {
  return fetchJSON(urlFor(url, params), init);
}
