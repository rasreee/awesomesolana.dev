import { Source, SourceType } from '@awesomesolana/common';

import { SourcesService } from '@/services/sources-service';

export interface RegisterSourceViewArgs {
  type: SourceType;
  url: string;
}

export async function registerSourceView(
  args: RegisterSourceViewArgs,
  sourcesService: SourcesService,
): Promise<void> {
  let source: Source | null = await sourcesService.findSource(args);

  if (!source) {
    source = await sourcesService.createSource(args);
  }

  source = await sourcesService.updateSource({
    url: source.url,
    type: source.type,
    views: source.views + 1,
  });
}
