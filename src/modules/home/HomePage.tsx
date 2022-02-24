import { Layout, Logo } from '@/ui/components';

import { SearchBar } from './SearchBar';

const DESCRIPTION =
  'Browse open-source projects built on Solana, filterable by dependencies, languages, frameworks, and/or topics.';

export function HomePage() {
  return (
    <Layout>
      <div className="mx-auto px-6 md:max-w-3xl">
        <div className="my-24 flex w-full flex-col gap-10">
          <div className="mx-auto flex flex-col items-center gap-6">
            <Logo size="lg" />
            <div className="text-body  text-center text-base leading-normal text-opacity-80 sm:text-lg md:text-xl">
              {DESCRIPTION}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <SearchBar />
          </div>
        </div>
      </div>
    </Layout>
  );
}
