import * as React from 'react';

import UnstyledLink from '@/ui/links/UnstyledLink';

interface LinkProps {
  href: string;
  label: string;
}

const links: LinkProps[] = [];

export default function Header() {
  return (
    <header className="layout flex h-14 items-center justify-between">
      <UnstyledLink href="/" className="font-bold hover:text-gray-600">
        Awesome Solana Dev
      </UnstyledLink>
      <nav>
        <ul className="flex items-center justify-between space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <UnstyledLink href={href} className="hover:text-gray-600">
                {label}
              </UnstyledLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
