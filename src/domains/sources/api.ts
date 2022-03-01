import { Source, SourceMeta } from './definitions';

export async function getSourceMeta(id: Source['id']): Promise<SourceMeta> {
  throw new Error(`getSourceMeta not implemented - called with ${id}`);
}
