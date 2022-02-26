import { searchRoute } from './search-route';

/**
 * @group modules
 * @group search
 * @group filters
 * @group helpers
 */
describe('utils/search-route', () => {
  describe('excludeCategory', () => {
    it('excludes filter category params from url', () => {
      const prevPath = `/search?q=testing&language=rust`;

      const category = 'language';

      const result = searchRoute.filters.excludeCategory(prevPath, category);
      expect(result).toEqual('/search?q=testing');
    });
  });

  describe('categoryParam', () => {
    it('parses and returns filter category from url', () => {
      const url = `/search/filters?category=language`;

      const category = 'language';

      const result = searchRoute.filters.categoryParam(url);

      expect(result).toEqual(category);
    });

    it('returns null given url with no category', () => {
      const url = `/search`;

      const result = searchRoute.filters.categoryParam(url);

      expect(result).toBeNull();
    });
  });
});
