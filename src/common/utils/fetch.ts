export async function authFetch(uri: string): Promise<Response> {
  return await fetch(uri, {
    headers: new Headers({
      Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
    }),
  });
}
