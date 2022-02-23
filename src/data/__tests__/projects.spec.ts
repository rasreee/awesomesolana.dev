import { ALL_PROJECTS, filterProjectsByTags } from '../projects';
import { ContentTag } from '../tags';

describe('data/projects', () => {
  describe('filterProjectsByTags', () => {
    it('should work', () => {
      const tags: ContentTag[] = [{ type: 'language', name: 'typescript' }];
      const result = filterProjectsByTags(ALL_PROJECTS, tags);
      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual('foo-bar');
    });
  });
});
