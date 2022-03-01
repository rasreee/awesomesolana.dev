import { SupabaseClient } from '@supabase/supabase-js';

import { SourcesService } from '@/services/sources-service';

export class Services {
  sources: SourcesService;

  constructor(client: SupabaseClient) {
    this.sources = new SourcesService(client);
  }
}
