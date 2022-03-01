import { Source, SourceType } from '@/domains/sources/definitions';
import { CreateSourceArgs } from '@/services/sources-service';

import { mockSourcesService } from '../test-utils/mockSourcesService';

/**
 * @group domains
 * @group sources
 * @group services
 */
describe('domains/sources/services', () => {
  const service = mockSourcesService();

  describe('createSource', () => {
    let createdSource: Source | null = null;

    const args: CreateSourceArgs = {
      url: '',
      type: SourceType.Repo,
    };

    afterEach(async () => {
      if (!createdSource) return;

      await service.deleteSource({ type: args.type, url: args.url });
    });

    it('finds or creates source', async () => {
      expect.assertions(1);
      const promise = service.createSource(args);
      expect(promise).resolves.toBeTruthy();

      createdSource = await promise;
    });
  });
});
