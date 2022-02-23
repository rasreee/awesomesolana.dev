import Image from 'next/image';

import clsxm from '@/lib/clsxm';
import { HideOnMobile, OnlyMobile } from '@/ui/components';
import UnstyledLink from '@/ui/links/UnstyledLink';

function LogoLink() {
  return (
    <>
      <HideOnMobile>
        <UnstyledLink
          href="/"
          className={clsxm(
            'flex items-center',
            'max-w-min sm:min-w-max',
            'font-heading text-2xl font-extrabold uppercase leading-none',
            'text-indigo-600 hover:text-indigo-700 active:text-indigo-800 dark:text-indigo-500 dark:hover:text-indigo-400',
          )}
        >
          <span className="text-2xl text-current">AWESOME</span>
          <div className="h-3 w-3 md:h-5 md:w-5">
            <Image
              height={32}
              width={32}
              src={'/images/solana.svg'}
              alt="solana-logo"
              objectFit="scale-down"
            />
          </div>
          OLANA.DEV
        </UnstyledLink>
      </HideOnMobile>
      <OnlyMobile>
        <UnstyledLink
          href="/"
          className={clsxm(
            'max-w-min sm:min-w-max',
            'font-heading text-lg font-extrabold uppercase leading-none',
            'text-indigo-600 hover:text-indigo-700 hover:text-gray-600 active:text-indigo-800 dark:text-indigo-500 dark:hover:text-indigo-400',
          )}
        >
          <span className="text-lg leading-none text-current">AWESOME</span>
          <Image
            height={16}
            width={16}
            src={'/images/solana.svg'}
            alt="solana-logo"
            className="my-auto mt-[1px]"
          />
          <span className="text-lg leading-none ">OLANA.dev</span>
        </UnstyledLink>
      </OnlyMobile>
    </>
  );
}

export default LogoLink;
