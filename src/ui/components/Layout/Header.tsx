import { useRouter } from 'next/router';

import { rem } from '@/lib/rem';
import { ColorModeToggle } from '@/ui/components';

import LogoLink from './LogoLink';

const buttonSize = rem(44);

export default function Header() {
  const router = useRouter();

  const isHomePath = router.asPath === '/';

  return (
    <header className="bg-app h-header-footer flex items-center justify-between px-5 md:gap-9">
      {!isHomePath ? (
        <div className="my-auto">
          <LogoLink />
        </div>
      ) : (
        <div />
      )}
      <ColorModeToggle style={{ height: buttonSize, width: buttonSize }} />
    </header>
  );
}
