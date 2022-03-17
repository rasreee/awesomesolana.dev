import { makeTag } from '@awesomesolana/common';

import { searchQuery } from './searchQuery';

/**
 * @group lib
 * @group search
 */
describe('lib/searchQuery', () => {
  const args = { tags: [makeTag({ name: 'typescript' })] };

  it('should return query object with tags', () => {
    expect(searchQuery(args).language).toEqual('typescript');
  });
});
