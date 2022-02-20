import { SearchData } from './types';

export function getSearchResultsForQuery<T extends SearchData = SearchData>(
  query: string,
  allData: T[],
): Promise<T[]> {
  if (!query) return Promise.resolve([]);

  let hits = [] as T[];

  const a = query.toLowerCase();

  hits = allData.filter((item) => {
    const b = item.title.toLowerCase().slice(0, query.length);

    return a === b;
  });

  console.log('Hits: ');
  console.table(hits);

  return Promise.resolve(hits);
}
