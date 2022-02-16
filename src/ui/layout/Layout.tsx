import * as React from 'react';

import Seo from '@/ui/Seo';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Put Header or Footer Here
  return (
    <>
      <Seo />
      {children}
    </>
  );
}
