import * as React from 'react';

import Seo from '@/ui/Seo';

import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Seo />
      <Header />
      <main className="min-h-[calc(100vh-124px)]">{children}</main>
      <Footer />
    </>
  );
}
