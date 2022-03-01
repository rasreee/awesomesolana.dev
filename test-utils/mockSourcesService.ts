/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import invariant from '@/lib/invariant';
import { SourcesService } from '@/services/sources-service';

dotenv.config({ path: '.env.local' });

const validateEnv = (...envVars: string[]) => {
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
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    ),
  );
};
