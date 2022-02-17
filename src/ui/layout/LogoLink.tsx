import React from 'react';

import { useIsMobile } from '@/hooks/useIsMobile';
import clsxm from '@/lib/clsxm';
import UnstyledLink from '@/ui/links/UnstyledLink';

function LogoLink() {
  const isMobile = useIsMobile();

  const logoText = React.useMemo(
    () => (isMobile ? 'AWESOL' : 'AWESOME SOLANA'),
    [],
  );

  return (
    <UnstyledLink
      href="/"
      className={clsxm(
        'max-w-min sm:min-w-max',
        'font-sans text-base font-extrabold leading-none hover:text-gray-600 sm:text-xl',
      )}
    >
      {logoText}
    </UnstyledLink>
  );
}

export default LogoLink;
