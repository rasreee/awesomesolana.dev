import clsxm from '@/lib/clsxm';
import { rem } from '@/lib/rem';
import ColorModeToggle from '@/ui/colorMode/ColorModeToggle';
import SearchModalToggle from '@/ui/searchModal/SearchModalToggle';

import LogoLink from './LogoLink';

const buttonSize = rem(44);

export default function Header() {
  return (
    <header className="bg-app layout h-header-footer flex items-center justify-between sm:px-6 sm:px-6 md:gap-9">
      <LogoLink />
      <div
        className={clsxm(
          'flex items-center gap-3',
          'sm:w-max sm:flex-1 sm:pl-[10%] md:pl-[30%]',
          'my-auto',
        )}
      >
        <SearchModalToggle style={{ height: buttonSize, width: buttonSize }} />
        <ColorModeToggle style={{ height: buttonSize, width: buttonSize }} />
      </div>
    </header>
  );
}
