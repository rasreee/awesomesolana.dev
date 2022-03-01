import { createClient } from "@supabase/supabase-js";

import environment from "./environment";
import {
  CreateSourceArgs,
  GetSourceMetaArgs,
  Source,
  UpdateSourceArgs,
} from "./types";

export class SourcesService {
  constructor(
    private client = createClient(
      environment.supabase.url,
      environment.supabase.key
    )
  ) {}

  getTable() {
    return this.client.from<Source>("sources");
  }

  async createSource(args: CreateSourceArgs): Promise<Source> {
    const { data, error } = await this.getTable()
      .insert({ type: args.type, url: args.url })
      .single();

    if (error) throw error;

    if (!data)
      throw new Error(
        `failed to create source for args ${JSON.stringify(args)}`
      );

    return data;
  }

  async findSource(args: GetSourceMetaArgs): Promise<Source | null> {
    const { data, error } = await this.getTable()
      .select("*")
      .match({ type: args.type, url: args.url })
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async findOrCreateSource(args: GetSourceMetaArgs): Promise<Source | null> {
    const found = await this.findSource(args);

    if (found) return null;

    return this.createSource(args);
  }

  async updateSource(args: UpdateSourceArgs): Promise<Source> {
    const { data, error } = await this.getTable()
      .update(args)
      .match({ url: args.url, type: args.type })
      .single();

    if (error) throw error;

    if (!data)
      throw new Error(
        `failed to update source meta for ${JSON.stringify(args)}`
      );

    return data;
  }
}
