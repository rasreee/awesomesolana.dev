import * as React from 'react';

import { Divider, Seo, SeoProps } from '@/ui/components';

import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
  children?: React.ReactNode;
  seoProps?: SeoProps;
}

export function Layout({ children, seoProps }: LayoutProps) {
  return (
    <>
      <Seo {...seoProps} />
      <div className="bg-app min-h-full w-screen">
        <Header />
        <main className="bg-app min-h-main flex-1">{children}</main>
        <Divider />
        <Footer />
      </div>
    </>
  );
}
