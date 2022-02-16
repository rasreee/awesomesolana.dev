import * as React from 'react';

import UnstyledLink from '@/ui/links/UnstyledLink';

interface LinkProps {
  href: string;
  label: string;
}

const links: LinkProps[] = [];

export default function Navigation() {
  return (
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
  );
}
