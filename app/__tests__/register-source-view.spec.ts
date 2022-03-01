import { SourceType } from '@awesomesolana/common';

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
    url: 'TEST_REGISTER_SOURCE_VIEW',
  };

  afterEach(async () => {
    await service.deleteSource(args);
  });

  it('registers source view', async () => {
    try {
      await registerSourceView(args, service);
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
