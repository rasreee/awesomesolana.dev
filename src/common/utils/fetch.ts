function getHeaders(): HeadersInit {
  const headers: HeadersInit = new Headers();
  headers.set('Accept', 'application/vnd.github.v3+json');
  process.env.GITHUB_ACCESS_TOKEN &&
    headers.set('Authorization', `token ${process.env.GITHUB_ACCESS_TOKEN}`);

  return headers;
}

export async function authFetch(uri: string): Promise<Response> {
  return await fetch(uri, {
    headers: getHeaders(),
  });
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
