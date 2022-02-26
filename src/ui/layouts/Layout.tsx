import Head from 'next/head';
import * as React from 'react';
import { FC } from 'react';

import { Divider, Seo, SeoProps } from '@/ui/components';

import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
  children?: React.ReactNode;
  seo?: SeoProps;
}

const Layout: FC<LayoutProps> = ({ children, seo }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Seo {...seo} />
      <div className="bg-app min-h-full w-screen">
        <Header />
        <main className="bg-app min-h-main flex-1">{children}</main>
        <Divider />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
