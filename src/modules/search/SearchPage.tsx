import { Layout } from '@/ui/layouts';

import { DependenciesMenu } from './DependenciesMenu';
import { SearchBar } from './SearchBar';

export function SearchPage() {
  return (
    <Layout>
      <div className="px-5 py-3">
        <DependenciesMenu />
      </div>
      <SearchBar />
    </Layout>
  );
}
