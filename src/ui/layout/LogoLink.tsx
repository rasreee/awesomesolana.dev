import React from 'react';

import clsxm from '@/lib/clsxm';
import UnstyledLink from '@/ui/links/UnstyledLink';

function LogoLink() {
  return (
    <>
      <div className="hidden md:block">
        <UnstyledLink
          href="/"
          className={clsxm(
            'max-w-min sm:min-w-max',
            'font-sans text-xl font-extrabold leading-none',
            'text-gray-700 hover:text-gray-800 active:text-gray-900 dark:hover:text-gray-300',
          )}
        >
          AWESOME SOLANA
        </UnstyledLink>
      </div>
      <div className="md:hidden">
        <UnstyledLink
          href="/"
          className={clsxm(
            'max-w-min sm:min-w-max',
            'font-sans text-base text-xl font-extrabold leading-none hover:text-gray-600',
          )}
        >
          AWESOME SOLANA
        </UnstyledLink>
      </div>
    </>
  );
}

export default LogoLink;
