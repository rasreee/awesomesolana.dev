import { githubApiRoute, githubSwrKey } from './api-url';

/**
 * @group modules
 * @group github
 * @group utils
 */
describe('githubSwrKey', () => {
  it('repos browse swr key', () => {
    const result = githubSwrKey.route('/browse');
    expect(result).toEqual('/api/github/browse?page=0&per_page=10');
  });
});

describe('githubApiRoute', () => {
  it('repos browse api route', () => {
    const result = githubApiRoute.browseRepos();
    expect(result).toEqual(`/search/repositories?q=solana&page=0&per_page=10`);
  });

  it('repos search api route', () => {
    const result = githubApiRoute.searchRepos({
      tags: [{ type: 'language', name: 'typescript' }],
    });
    expect(result).toEqual(
      `/search/repositories?q=solana+language:typescript&page=0&per_page=10`,
    );
  });
});
