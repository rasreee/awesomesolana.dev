import { getSeo } from '@utils/seo';
import { DefaultSeo } from 'next-seo';
import * as React from 'react';

import { Divider, Seo, SeoProps } from '@/ui/components';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

export interface AppLayoutProps {
  children?: React.ReactNode;
  seoProps?: SeoProps;
}

export function AppLayout({ children, seoProps }: AppLayoutProps) {
  const seo = getSeo();

  return (
    <>
      <Seo {...seoProps} />
      <DefaultSeo {...seo} />
      <div className="bg-app min-h-full w-screen">
        <AppHeader />
        <main className="bg-app min-h-main flex-1">
          <div className="w-full gap-3 sm:flex sm:items-start">{children}</div>
        </main>
        <Divider />
        <AppFooter />
      </div>
    </>
  );
}
