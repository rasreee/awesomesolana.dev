import Link from 'next/link';

import { Logo } from '@/ui/logo';
import Responsive from '@/ui/responsive/responsive';

function LogoLink() {
  return (
    <>
      <Responsive
        sm={
          <Link href="/" passHref>
            <a>
              <Logo size="xs" />
            </a>
          </Link>
        }
        aboveSm={
          <Link href="/" passHref>
            <a>
              <Logo size="sm" />
            </a>
          </Link>
        }
        aboveMd={
          <Link href="/" passHref>
            <a>
              <Logo size="md" />
            </a>
          </Link>
        }
      />
    </>
  );
}

export default LogoLink;
