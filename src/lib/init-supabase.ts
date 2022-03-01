import { createClient, SupabaseClient } from '@supabase/supabase-js';

import getEnvVar from './getEnvVar';
import validateEnv from './validateEnv';

export interface initSupabaseArgs {
  url: string;
  key: string;
}

export function initSupabase(args?: initSupabaseArgs): SupabaseClient {
  validateEnv('NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_KEY');
  const config = args
    ? args
    : {
        url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
        key: getEnvVar('NEXT_PUBLIC_SUPABASE_KEY'),
      };

  return createClient(config.url, config.key);
}
