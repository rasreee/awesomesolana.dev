import { searchRoute } from './route';

/**
 * @group modules
 * @group search
 * @group tags
 * @group helpers
 */
describe('core/search', () => {
  describe('excludeType', () => {
    it('excludes tag type params from url', () => {
      const prevPath = `/search?q=testing&language=rust`;

      const type = 'language';

      const result = searchRoute.tags.excludeType(prevPath, type);
      expect(result).toEqual('/search?q=testing');
    });
  });

  describe('typeParam', () => {
    it('parses and returns tag type from url', () => {
      const url = `/search/tags?type=language`;

      const type = 'language';

      const result = searchRoute.tags.typeParam(url);

      expect(result).toEqual(type);
    });

    it('returns null given url with no type', () => {
      const url = `/search`;

      const result = searchRoute.tags.typeParam(url);

      expect(result).toBeNull();
    });
  });

  describe('typeUrl', () => {
    it('gets page url for type', () => {
      const type = 'language';

      const result = searchRoute.tags.typeUrl(type);

      expect(result).toEqual(`/search/tags?type=${type}`);
    });
  });
});
