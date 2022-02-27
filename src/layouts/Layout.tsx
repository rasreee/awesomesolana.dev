import Head from 'next/head';
import * as React from 'react';

import type { SeoProps } from '@/ui/components/Seo';

const Seo = dynamic(() => import('@/ui/components/Seo'));

import dynamic from 'next/dynamic';

import Header from './Header';

export interface LayoutProps {
  children?: React.ReactNode;
  seo?: SeoProps;
}

const Layout: React.FC<LayoutProps> = ({ children, seo }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Seo {...seo} />
      <div className="bg-app min-h-full w-screen">
        <Header />
        <main className="bg-app min-h-main flex-1">{children}</main>
      </div>
    </>
  );
};

export default Layout;

const Noop: React.FC = ({ children }) => <>{children}</>;

export function getLayout<LP extends {}>(
  Component: React.ComponentType<any>,
): React.ComponentType<LP> {
  return (Component as any).Layout || Noop;
}
