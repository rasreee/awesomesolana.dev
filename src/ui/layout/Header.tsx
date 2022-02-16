import ColorModeToggle from '@/ui/colorMode/ColorModeToggle';
import SearchModalToggle from '@/ui/searchModal/SearchModalToggle';

import LogoLink from './LogoLink';

export default function Header() {
  return (
    <header className="flex h-[4.5rem] items-center justify-between gap-4 px-6 sm:px-6 md:gap-9">
      <LogoLink />
      <div className="flex items-center gap-3">
        <SearchModalToggle />
        <ColorModeToggle />
      </div>
    </header>
  );
}
