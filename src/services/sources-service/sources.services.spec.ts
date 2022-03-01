import { Source, SourceType } from '@/domains/sources/definitions';
import { initSupabase } from '@/lib/init-supabase';

import { SourcesService } from './sources-service';
import { FindOrCreateSourceArgs } from './types';

/**
 * @group domains
 * @group sources
 * @group services
 */
describe('domains/sources/services', () => {
  const service = new SourcesService(
    initSupabase({
      key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjam1wZGZ3cGh5b2Jwb3h6ZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwMzgzODEsImV4cCI6MTk2MDYxNDM4MX0.0EYr9kBj17GkbfeXzgFnzsFEulcytOcTFD_zOfuPkd4',
      url: 'https://ccjmpdfwphyobpoxzfel.supabase.co',
    }),
  );

  describe('findOrCreateSource()', () => {
    let createdSource: Source | null = null;

    const args: FindOrCreateSourceArgs = {
      type: SourceType.Repo,
      url: '',
      tags: [],
      title: '',
    };

    afterEach(async () => {
      if (!createdSource) return;

      await service.deleteSource(createdSource.id);
    });

    it('finds or creates source', async () => {
      expect.assertions(1);
      const promise = service.findOrCreateSource(args);
      expect(promise).resolves.toBeTruthy();

      createdSource = await promise;
    });
  });
});
