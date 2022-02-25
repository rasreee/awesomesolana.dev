import { githubSwrKey } from './api';

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
});
