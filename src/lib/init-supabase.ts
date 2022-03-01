import { createClient, SupabaseClient } from '@supabase/supabase-js';

import getEnvVar from './getEnvVar';
export interface initSupabaseArgs {
  url: string;
  key: string;
}

export function initSupabase(args?: initSupabaseArgs): SupabaseClient {
  const config = args
    ? args
    : {
        url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
        key: getEnvVar('NEXT_PUBLIC_SUPABASE_KEY'),
      };

  return createClient(config.url, config.key);
}
