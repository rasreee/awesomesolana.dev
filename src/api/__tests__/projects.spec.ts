import { ALL_PROJECTS, filterProjectsByTags } from '../projects';
import { Tag } from '../tags/types';

describe('api/projects', () => {
  describe('filterProjectsByTags', () => {
    it('should work', () => {
      const tags: Tag[] = [{ category: 'language', name: 'typescript' }];
      const result = filterProjectsByTags(ALL_PROJECTS, tags);
      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual('foo-bar');
    });
  });
});
