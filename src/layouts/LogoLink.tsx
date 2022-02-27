import { Logo } from '@/ui/components';
import { UnstyledLink } from '@/ui/links';
import { Responsive } from '@/ui/responsive';

function LogoLink() {
  return (
    <>
      <Responsive
        sm={
          <UnstyledLink href="/">
            <Logo size="sm" />
          </UnstyledLink>
        }
        aboveSm={
          <UnstyledLink href="/">
            <Logo size="md" />
          </UnstyledLink>
        }
      />
    </>
  );
}

export default LogoLink;
