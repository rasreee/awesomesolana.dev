function getHeaders(): HeadersInit {
  const headers: HeadersInit = new Headers();
  headers.set('Accept', 'application/vnd.github.v3+json');
  process.env.GITHUB_ACCESS_TOKEN &&
    headers.set('Authorization', `token ${process.env.GITHUB_ACCESS_TOKEN}`);

  return headers;
}

export async function githubFetch(uri: string): Promise<Response> {
  const res = await fetch(uri, {
    headers: getHeaders(),
  });

  return res;
}
