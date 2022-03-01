import { githubApiUrl, githubSwrKey } from './api-url';

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

describe('githubApiUrl', () => {
  it('repos browse api route', () => {
    const result = githubApiUrl.browseRepos();
    expect(result.includes(`?q=solana&page=0&per_page=10`)).toBeTruthy();
  });

  it('repos search api route', () => {
    const result = githubApiUrl.searchRepos({
      tags: [{ id: 0, type: 'language', name: 'typescript' }],
    });
    expect(
      result.includes(`?q=solana+language:typescript&page=0&per_page=10`),
    ).toBeTruthy();
  });
});
