import { HideOnMobile, Logo, OnlyMobile, UnstyledLink } from '@/ui/components';
import { clsxm } from '@/ui/utils';

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
