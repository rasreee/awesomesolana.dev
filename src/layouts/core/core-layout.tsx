import * as React from 'react';

const Seo = dynamic(() => import('@/ui/seo'));

import dynamic from 'next/dynamic';

import Header from './core-header';
import type { LayoutProps } from './types';

const Layout: React.FC<LayoutProps> = ({
  children,
  seo,
  title,
  description,
}) => {
  return (
    <>
      <Seo {...seo} title={title} description={description} />
      <div className="bg-app min-h-full w-screen">
        <Header />
        <main className="bg-app min-h-main flex-1">{children}</main>
      </div>
    </>
  );
};

export default Layout;
