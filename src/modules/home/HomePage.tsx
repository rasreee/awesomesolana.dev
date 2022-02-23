import { SearchBar } from '@/modules/search';
import { Layout } from '@/ui/layouts';

const DESCRIPTION =
  'Browse open-source projects built on Solana, filterable by dependencies or topics.';

export function HomePage() {
  return (
    <Layout>
      <div className="mx-8 my-12 max-w-6xl">
        <div className="text-center text-4xl font-bold uppercase">
          AwesomeSolana.DEV
        </div>
        <div className="my-3 text-center text-lg">{DESCRIPTION}</div>
      </div>
      <SearchBar />
    </Layout>
  );
}
