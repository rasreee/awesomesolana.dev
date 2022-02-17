import * as React from 'react';

import Seo, { SeoProps } from '@/ui/Seo';

import { Divider } from '../divider';
import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
  children?: React.ReactNode;
  seoProps?: SeoProps;
}

export default function Layout({ children, seoProps }: LayoutProps) {
  return (
    <>
      <Seo {...seoProps} />
      <div className="bg-app min-h-full min-w-full">
        <Header />
        <main className="bg-app min-h-main flex-1">{children}</main>
        <Divider />
        <Footer />
      </div>
    </>
  );
}
