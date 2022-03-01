import { useCallback } from 'react';

import { useServices } from '@/services/services-context';
import {
  registerSourceView,
  RegisterSourceViewArgs,
} from '@/usecases/register-source-view';

export const useRegisterSourceView = () => {
  const { sources } = useServices();

  return useCallback(
    (args: RegisterSourceViewArgs) => registerSourceView(args, sources),
    [],
  );
};
