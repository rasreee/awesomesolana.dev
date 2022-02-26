import clsxm from '@utils/clsxm';

import { HideOnMobile, Logo, OnlyMobile, UnstyledLink } from '@/ui/components';

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
