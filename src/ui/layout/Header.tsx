import { useRouter } from 'next/router';

import { rem } from '@/lib/rem';
import ColorModeToggle from '@/ui/colorMode/ColorModeToggle';

import LogoLink from './LogoLink';

const buttonSize = rem(44);

export default function Header() {
  const router = useRouter();

  const isHomePath = router.asPath === '/';

  return (
    <header className="bg-app layout h-header-footer flex items-center justify-between sm:px-6 sm:px-6 md:gap-9">
      {!isHomePath ? <LogoLink /> : <div />}
      <ColorModeToggle style={{ height: buttonSize, width: buttonSize }} />
    </header>
  );
}
