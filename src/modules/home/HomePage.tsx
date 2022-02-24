import Image from 'next/image';

import { Layout } from '@/ui/components';

import { SearchBar } from './SearchBar';

const DESCRIPTION =
  'Browse open-source projects built on Solana, filterable by dependencies, languages, frameworks, and/or topics.';

export function HomePage() {
  return (
    <Layout>
      <div className="mx-auto px-6 md:max-w-3xl">
        <div className="my-24 flex w-full flex-col gap-10">
          <div className="mx-auto flex flex-col items-center gap-6">
            <div className="flex items-center text-center font-heading text-2xl font-extrabold uppercase leading-none text-indigo-600 sm:text-3xl md:text-5xl">
              <span className="text-2xl leading-none sm:text-3xl md:text-5xl">
                Awesome
              </span>
              <div className="h-5 w-5 md:h-10 md:w-10">
                <Image
                  height={40}
                  width={40}
                  src={'/images/solana.svg'}
                  alt="solana-logo"
                  objectFit="scale-down"
                />
              </div>
              olana.DEV
            </div>
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
