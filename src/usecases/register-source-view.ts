import { Source, SourceType } from '@/domains/sources/definitions';
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

  process.env.NODE_ENV === 'development' &&
    console.log('✅ registered source view!', JSON.stringify({ source }));
}
