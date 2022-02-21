export type Tag = { name: string; type: 'content-type' | 'dependency' };

const TAGS: Tag[] = [{ name: '@project-serum/anchor', type: 'dependency' }];

export async function searchTags(query: string): Promise<Tag[]> {
  if (!query) return Promise.resolve([]);

  let hits = [] as Tag[];

  const a = query.toLowerCase();

  hits = TAGS.filter((item) => {
    const b = item.name.toLowerCase().slice(0, query.length);

    return a === b;
  });

  console.table(hits);

  return Promise.resolve(hits);
}
