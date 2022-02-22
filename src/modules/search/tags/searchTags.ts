import { Tag, tags } from './tags';

export async function searchTags(query: string): Promise<Tag[]> {
  if (!query) return Promise.resolve([]);

  let hits = [] as Tag[];

  const a = query.toLowerCase();

  hits = tags.filter((item) => {
    const name = item.name;
    const b = name.toLowerCase().slice(0, query.length);

    return a === b;
  });

  console.table(hits);

  return Promise.resolve(hits);
}
