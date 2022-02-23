import * as React from 'react';

import { Divider, Seo, SeoProps } from '@/ui/components';

import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
  children?: React.ReactNode;
  seoProps?: SeoProps;
}

export function Layout({ children, seoProps }: LayoutProps) {
  React.useEffect(() => {
    const screen = window.screen;
    console.log('SCREEN: ', screen);
  }, []);

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
