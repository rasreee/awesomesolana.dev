import { SearchData } from './types';

export function getSearchResultsForQuery(
  query: string,
  allData: SearchData[],
): Promise<SearchData[]> {
  if (!query) return Promise.resolve([]);

  let hits = [] as SearchData[];

  const a = query.toLowerCase();

  hits = allData.filter((item) => {
    const b = item.title.toLowerCase().slice(0, query.length);

    return a === b;
  });

  console.log('Hits: ');
  console.table(hits);

  return Promise.resolve(hits);
}
