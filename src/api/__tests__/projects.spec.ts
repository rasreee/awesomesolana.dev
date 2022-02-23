import { SearchFilter } from '../filters';
import { ALL_PROJECTS, filterProjectsByTags } from '../projects';

describe('api/projects', () => {
  describe('filterProjectsByTags', () => {
    it('should work', () => {
      const tags: SearchFilter[] = [{ type: 'language', name: 'typescript' }];
      const result = filterProjectsByTags(ALL_PROJECTS, tags);
      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual('foo-bar');
    });
  });
});
