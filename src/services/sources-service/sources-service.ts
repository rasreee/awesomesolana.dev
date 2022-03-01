import { SupabaseClient } from '@supabase/supabase-js';

import { Source, SOURCE_TABLE } from '@/domains/sources/definitions';
import { initSupabase } from '@/lib/init-supabase';

import {
  CreateSourceArgs,
  DeleteSourceArgs,
  GetSourceMetaArgs,
  UpdateSourceArgs,
} from './types';

export class SourcesService {
  private client: SupabaseClient;
  constructor(_client?: SupabaseClient) {
    this.client = _client ?? initSupabase();
  }

  async deleteSource(args: DeleteSourceArgs): Promise<void> {
    const { error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .delete()
      .match({ type: args.type, url: args.url });

    if (error) throw error;
  }

  async createSource(args: CreateSourceArgs): Promise<Source> {
    console.log('getSourceMeta()', JSON.stringify({ args }));

    const { data, error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .insert({ type: args.type, url: args.url })
      .single();

    if (error) throw error;

    if (!data)
      throw new Error(
        `failed to create source for args ${JSON.stringify(args)}`,
      );

    return data;
  }

  async findSource(args: GetSourceMetaArgs): Promise<Source | null> {
    console.log('getSourceMeta()', JSON.stringify({ args }));

    const { data, error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .select('*')
      .match({ type: args.type, url: args.url })
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async updateSource(args: UpdateSourceArgs): Promise<Source> {
    console.log('updateSourceMeta()', JSON.stringify({ args }));

    const { data, error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .update(args)
      .match({ url: args.url, type: args.type })
      .single();

    if (error) throw error;

    if (!data)
      throw new Error(
        `failed to update source meta for ${JSON.stringify(args)}`,
      );

    return data;
  }
}
