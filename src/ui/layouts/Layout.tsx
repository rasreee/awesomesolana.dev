import { getSeo } from '@utils/seo';
import { DefaultSeo } from 'next-seo';
import * as React from 'react';
import { FC } from 'react';

import { Divider, Seo, SeoProps } from '@/ui/components';

import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
  children?: React.ReactNode;
  seoProps?: SeoProps;
}

const Layout: FC<LayoutProps> = ({ children, seoProps }) => {
  const seo = getSeo();

  return (
    <>
      <Seo {...seoProps} />
      <DefaultSeo {...seo} />
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
