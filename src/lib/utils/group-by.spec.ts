import { allTags, tagNames } from '@/modules/tags';

import { getPossibleValuesSet, groupBy } from './group-by';

/**
 * @group unit
 * @group array
 */
describe('groupBy', () => {
  describe('getPossibleValuesSet', () => {
    it('should get set of possible values given prop name', () => {
      const key = 'id';

      const list = [
        { id: 'a', name: '1' },
        { id: 'b', name: '2' },
        { id: 'a', name: '3' },
      ];

      const result = getPossibleValuesSet(list, key);

      expect(result.length).toBe(2);
      expect(result).toEqual(['a', 'b']);
    });
  });

  it('should group list by type', () => {
    const key = 'id';

    const list = [
      { id: 'a', name: '1' },
      { id: 'b', name: '2' },
      { id: 'a', name: '3' },
      { id: 'a', name: '4' },
    ];

    const result = groupBy(list, key);

    expect(Object.keys(result).length).toBe(2);
    expect(result['a'].length).toEqual(3);

    expect(result['a']).toEqual([
      { id: 'a', name: '1' },
      { id: 'a', name: '3' },
      { id: 'a', name: '4' },
    ]);

    expect(result['b']).toEqual([{ id: 'b', name: '2' }]);
  });

  it('should group tags', () => {
    const result = groupBy(allTags, 'type');

    expect(Object.keys(result).length).toBe(4);
    expect(result.language.length).toBe(tagNames.language.length);
    expect(result.topic.length).toBe(tagNames.topic.length);
    expect(result.framework.length).toBe(tagNames.framework.length);
    expect(result.dependency.length).toBe(
      tagNames.dependency.npm.length + tagNames.dependency.cargo.length,
    );
  });
});
