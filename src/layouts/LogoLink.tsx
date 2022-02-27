import { Logo, ResponsiveRender } from '@/ui/components';
import { UnstyledLink } from '@/ui/links';

function LogoLink() {
  return (
    <>
      <ResponsiveRender
        mobile={
          <UnstyledLink href="/">
            <Logo size="sm" />
          </UnstyledLink>
        }
        aboveMobile={
          <UnstyledLink href="/">
            <Logo size="md" />
          </UnstyledLink>
        }
      />
    </>
  );
}

export default LogoLink;
