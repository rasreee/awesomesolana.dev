const GITHUB_API_URL = 'https://api.github.com';

import { githubApi, githubSwrKey } from './api';

/**
 * @group modules
 * @group github
 * @group api
 */
describe('modules/github/api', () => {
  describe('githubSwrKey', () => {
    it('should format browse repos swr key', () => {
      const result = githubSwrKey.route('/browse');
      expect(result).toEqual('/api/github/browse?page=0&per_page=10');
    });
  });

  describe('githubApi', () => {
    it('should format github repos browse api url', () => {
      const result = githubApi.browseRepos();
      expect(result).toEqual(
        `${GITHUB_API_URL}/search/repositories?q=solana&page=0&per_page=10`,
      );
    });

    it('should format github repos search api url', () => {
      const result = githubApi.searchRepos({
        filters: [{ category: 'language', name: 'typescript' }],
      });
      expect(result).toEqual(
        `${GITHUB_API_URL}/search/repositories?q=solana+language:typescript&page=0&per_page=10`,
      );
    });
  });
});
