import * as React from 'react';

import Seo, { SeoProps } from '@/ui/Seo';

import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
  children: React.ReactNode;
  seoProps?: SeoProps;
}

export default function Layout({ children, seoProps }: LayoutProps) {
  return (
    <div className="bg-light dark:bg-dark">
      <Seo {...seoProps} />
      <Header />
      <main className="min-h-[calc(100vh-124px)]">{children}</main>
      <Footer />
    </div>
  );
}
