import { SourceType } from '@/domains/sources/definitions';

import {
  registerSourceView,
  RegisterSourceViewArgs,
} from '../src/usecases/register-source-view';
import { mockSourcesService } from '../test-utils/mockSourcesService';

/**
 * @group usecases
 */
describe('usecases/register-source-view', () => {
  const service = mockSourcesService();

  const args: RegisterSourceViewArgs = {
    type: SourceType.Repo,
    url: 'TEST_SOURCE_URL',
  };

  afterAll(() => {
    service.deleteSource(args);
  });

  it('registers source view', () => {
    const promise = registerSourceView(args, service);

    expect(promise).resolves.toBeTruthy();
  });
});
