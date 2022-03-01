import { SourcesService } from '@/services/sources-service';

export interface Services {
  sources: SourcesService;
}

export class Services {
  sources: SourcesService = new SourcesService();
}
