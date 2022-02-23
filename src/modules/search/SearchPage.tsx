import { useRouter } from 'next/router';

import clsxm from '@/lib/clsxm';
import { Tag } from '@/ui/components';
import { Layout } from '@/ui/layouts';

import { SearchBar } from './SearchBar';
import { useSearch } from './SearchContext';

export function SearchPage() {
  const router = useRouter();

  const { search } = useSearch();

  const removeTag = (tagToRemove: string) => () => {
    const { tags } = search;

    if (!tags) return;

    const newTags = tags.filter((tagName) => tagName !== tagToRemove);

    const newPath =
      newTags.length > 0 ? `/search?tags=${newTags.join(',')}` : `/search`;

    router.push(newPath);
  };

  return (
    <Layout>
      <div className="px-5 py-3">
        <ul className={clsxm('flex flex-wrap items-center gap-3')}>
          {search.tags?.map((tag) => (
            <li key={tag}>
              <Tag onClickRemove={removeTag(tag)}>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
      <SearchBar />
    </Layout>
  );
}
