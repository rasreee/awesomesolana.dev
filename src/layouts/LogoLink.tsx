import clsxm from '@utils/clsxm';

import { HideOnMobile, Logo, OnlyMobile } from '@/ui/components';
import { UnstyledLink } from '@/ui/links';

function LogoLink() {
  return (
    <>
      <HideOnMobile>
        <UnstyledLink href="/">
          <Logo size="md" />
        </UnstyledLink>
      </HideOnMobile>
      <OnlyMobile>
        <UnstyledLink href="/" className={clsxm()}>
          <Logo size="sm" />
        </UnstyledLink>
      </OnlyMobile>
    </>
  );
}

export default LogoLink;
