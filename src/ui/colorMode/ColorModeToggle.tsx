import React from 'react';

import { SVGIconProps } from '@/ui/icon/types';

import { useColorMode } from './useColorMode';

function MoonSolidIcon(props: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

function SunOutlineIcon(props: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ColorModeToggle() {
  const { mode, toggle } = useColorMode();
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  const Icon = React.useMemo(
    () => (mode === 'dark' ? MoonSolidIcon : SunOutlineIcon),
    [mode],
  );

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300  transition-all hover:ring-2  dark:bg-gray-600"
      onClick={toggle}
    >
      {mounted && <Icon />}
    </button>
  );
}
