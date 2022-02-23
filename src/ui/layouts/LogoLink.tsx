import React from 'react';

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
            'max-w-min sm:min-w-max',
            'font-sans text-xl font-extrabold leading-none',
            'text-gray-700 hover:text-gray-800 active:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50',
          )}
        >
          AWESOME SOLANA
        </UnstyledLink>
      </HideOnMobile>
      <OnlyMobile>
        <UnstyledLink
          href="/"
          className={clsxm(
            'max-w-min sm:min-w-max',
            'font-sans text-base text-xl font-extrabold leading-none hover:text-gray-600',
          )}
        >
          AWESOME SOLANA
        </UnstyledLink>
      </OnlyMobile>
    </>
  );
}

export default LogoLink;
