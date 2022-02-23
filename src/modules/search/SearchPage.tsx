import { Layout } from '@/ui/layouts';

import { groupTagsByType } from '../tags';
import { SearchBar } from './SearchBar';
import { useSearch } from './SearchContext';
import { TagsMenu } from './TagsMenu';

export function SearchPage() {
  const { search } = useSearch();

  return (
    <Layout>
      <div className="flex items-center gap-2 px-5 py-3">
        {search.tags &&
          groupTagsByType(search.tags).map(({ type, tags }) => (
            <div key={type}>
              <TagsMenu type={type} tags={tags} />
            </div>
          ))}
      </div>
      <SearchBar />
    </Layout>
  );
}
