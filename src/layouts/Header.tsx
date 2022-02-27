import { useRouter } from 'next/router';

import { siteConfig } from '@/configs/site-config';
import { ColorModeToggle } from '@/ui/colorMode';
import { GithubIcon } from '@/ui/github';
import { rem } from '@/ui/utils';

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
      <a href={siteConfig.socials.github.href}>
        <GithubIcon />
      </a>
      <ColorModeToggle style={{ height: buttonSize, width: buttonSize }} />
    </header>
  );
}
