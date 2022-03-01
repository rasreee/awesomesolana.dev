import { useCallback } from 'react';

import { useServices } from '@/services/services-context';
import { RegisterSourceViewArgs } from '@/usecases/register-source-view';

export const useRegisterSourceView = () => {
  const { sources } = useServices();

  const registerSourceView = useCallback(
    async (args: RegisterSourceViewArgs): Promise<void> => {
      const source = await sources.findOrCreateSource(args);

      let sourceMeta = await sources.getSourceMeta({
        source_id: source.id,
      });

      sourceMeta = await sources.updateSourceMeta({
        views: sourceMeta.views + 1,
      });

      console.log('✅ registered source view!', JSON.stringify({ sourceMeta }));
    },
    [],
  );

  return registerSourceView;
};
