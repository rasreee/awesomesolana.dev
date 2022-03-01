import Link from 'next/link';

import { Logo } from '@/ui/logo';
import RenderBreakpoints from '@/ui/responsive/render-breakpoints';

function LogoLink() {
  return (
    <>
      <RenderBreakpoints
        sm={
          <Link href="/">
            <a>
              <Logo size="xs" />
            </a>
          </Link>
        }
        aboveSm={
          <Link href="/">
            <a>
              <Logo size="sm" />
            </a>
          </Link>
        }
        aboveMd={
          <Link href="/">
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
