/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

import { initSupabase } from '@/lib/init-supabase';
import invariant from '@/lib/invariant';
import { SourcesService } from '@/services/sources-service';

dotenv.config({ path: '.env.local' });

export const validateEnv = (...envVars: string[]) => {
  envVars.forEach((envVar) => {
    invariant(
      process.env[envVar],
      `Environment variable ${envVar} was undefined`,
    );
  });
};

export const mockSourcesService = () => {
  validateEnv('NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_KEY');

  return new SourcesService(
    initSupabase({
      key: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    }),
  );
};
