import ColorModeToggle from '@/ui/colorMode/ColorModeToggle';
import UnstyledLink from '@/ui/links/UnstyledLink';

import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="layout flex h-14 items-center justify-between">
      <UnstyledLink href="/" className="font-bold hover:text-gray-600">
        Awesome Solana Dev
      </UnstyledLink>
      <Navigation />
      <ColorModeToggle />
    </header>
  );
}
