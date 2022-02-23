import { Layout } from '@/ui/layouts';

import { ContentTag, tagsByType } from '../tags';
import { SearchBar } from './SearchBar';
import { useSearch } from './SearchContext';
import { TagsMenu } from './TagsMenu';

type GroupedTags = Array<{ type: ContentTag['type']; tags: ContentTag[] }>;

export function SearchPage() {
  const { search } = useSearch();

  const groupTags = (tags: ContentTag[]): GroupedTags => {
    return [
      { type: 'dependency', tags: tagsByType(tags, 'dependency') },
      { type: 'topic', tags: tagsByType(tags, 'topic') },
    ];
  };

  return (
    <Layout>
      <div className="flex items-center gap-2 px-5 py-3">
        {search.tags &&
          groupTags(search.tags).map(({ type, tags }) => (
            <div key={type}>
              <TagsMenu type={type} tags={tags} />
            </div>
          ))}
      </div>
      <SearchBar />
    </Layout>
  );
}
