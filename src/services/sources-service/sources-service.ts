import { SupabaseClient } from '@supabase/supabase-js';

import {
  Source,
  SOURCE_META_TABLE,
  SOURCE_TABLE,
  SourceMeta,
} from '@/domains/sources/definitions';
import { initSupabase } from '@/lib/init-supabase';

import {
  CreateSourceArgs,
  FindOrCreateSourceArgs,
  FindSourceArgs,
} from './types';

export class SourcesService {
  private client: SupabaseClient;
  constructor(_client?: SupabaseClient) {
    this.client = _client ?? initSupabase();
  }

  async createSource(args: CreateSourceArgs): Promise<Source> {
    const { data: createdSource, error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .insert(args)
      .single();

    if (error) throw error;

    if (!createdSource)
      throw new Error(`failed to create source for ${JSON.stringify(args)}`);

    return createdSource;
  }

  async deleteSource(id: Source['id']) {
    console.log(`Deleting source for id=${id}`);

    const { error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(
        `Failed to delete source for ${JSON.stringify({ id })}.`,
        error,
      );
      throw error;
    }
  }

  async findSource(args: FindSourceArgs): Promise<Source | null> {
    const { data: foundSource, error: foundError } = await this.client
      .from<Source>(SOURCE_TABLE)
      .select('*')
      .match(args)
      .limit(1)
      .maybeSingle();

    if (!foundError) throw foundError;

    return foundSource;
  }

  async findOrCreateSource(args: FindOrCreateSourceArgs): Promise<Source> {
    let source: Source | null = await this.findSource(args);

    if (!source) {
      source = await this.createSource({
        title: args.title,
        type: args.type,
        url: args.url,
        tags: args.tags,
      });
    }

    return source;
  }

  async getSourceMeta(args: { source_id: Source['id'] }): Promise<SourceMeta> {
    console.log('getSourceMeta()', JSON.stringify({ args }));

    const { data, error } = await this.client
      .from<SourceMeta>(SOURCE_META_TABLE)
      .select('*')
      .match({ source_id: args.source_id })
      .single();

    if (error) throw error;

    if (!data)
      throw new Error(`failed to get source meta for ${JSON.stringify(args)}`);

    return data;
  }

  async updateSourceMeta(args: Partial<SourceMeta>): Promise<SourceMeta> {
    console.log('updateSourceMeta()', JSON.stringify({ args }));

    const { data, error } = await this.client
      .from<SourceMeta>(SOURCE_META_TABLE)
      .update(args)
      .match({ source_id: args.source_id })
      .single();

    if (error) throw error;

    if (!data)
      throw new Error(
        `failed to update source meta for ${JSON.stringify(args)}`,
      );

    return data;
  }
}
