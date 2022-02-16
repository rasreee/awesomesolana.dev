import ColorModeToggle from '@/ui/colorMode/ColorModeToggle';
import UnstyledLink from '@/ui/links/UnstyledLink';
import SearchModalToggle from '@/ui/searchModal/SearchModalToggle';

import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="layout flex h-[4.5rem] items-center justify-between gap-9">
      <UnstyledLink href="/" className="font-bold hover:text-gray-600">
        Awesome Solana Dev
      </UnstyledLink>
      <SearchModalToggle className="max-w-[40%] flex-1" />
      <Navigation />
      <ColorModeToggle />
    </header>
  );
}
