import ColorModeToggle from '@/ui/colorMode/ColorModeToggle';
import UnstyledLink from '@/ui/links/UnstyledLink';
import SearchModalToggle from '@/ui/searchModal/SearchModalToggle';

import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="layout flex h-14 items-center justify-between">
      <UnstyledLink href="/" className="font-bold hover:text-gray-600">
        Awesome Solana Dev
      </UnstyledLink>
      <SearchModalToggle />
      <Navigation />
      <ColorModeToggle />
    </header>
  );
}
