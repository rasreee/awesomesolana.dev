import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { Source, SOURCE_TABLE } from '@/domains/sources/definitions';
import environment from '@/environment';

import {
  CreateSourceArgs,
  DeleteSourceArgs,
  GetPopularSourcesArgs,
  GetSourceMetaArgs,
  UpdateSourceArgs,
} from './types';

export class SourcesService {
  private client: SupabaseClient;
  constructor(_client?: SupabaseClient) {
    this.client =
      _client ??
      createClient(environment.supabase.url, environment.supabase.key);
  }

  private static _instance: SourcesService | null = null;

  public static getInstance(): SourcesService {
    if (this._instance) return this._instance;

    const instance = new SourcesService();

    this._instance = instance;

    return instance;
  }

  async deleteSource(args: DeleteSourceArgs): Promise<void> {
    const { error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .delete()
      .match({ type: args.type, url: args.url });

    if (error) throw error;
  }

  async createSource(args: CreateSourceArgs): Promise<Source> {
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
    const { data, error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .select('*')
      .match({ type: args.type, url: args.url })
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async updateSource(args: UpdateSourceArgs): Promise<Source> {
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

  async getPopularSources({
    type,
    page = 0,
    per_page = 5,
  }: GetPopularSourcesArgs): Promise<Source[]> {
    const { data, error } = await this.client
      .from<Source>(SOURCE_TABLE)
      .select('*')
      .match({ type })
      .order('views', { ascending: false })
      .range(page, per_page)
      .limit(per_page);

    if (error) throw error;

    return data ?? [];
  }
}
