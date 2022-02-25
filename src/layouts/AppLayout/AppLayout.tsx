import * as React from 'react';

import {
  SearchOptionsModal,
  SearchOptionsSidebar,
} from '@/modules/search/components';
import { Divider, ResponsiveRender, Seo, SeoProps } from '@/ui/components';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

export interface AppLayoutProps {
  children?: React.ReactNode;
  seoProps?: SeoProps;
}

export function AppLayout({ children, seoProps }: AppLayoutProps) {
  return (
    <>
      <Seo {...seoProps} />
      <div className="bg-app min-h-full w-screen">
        <AppHeader />
        <main className="bg-app min-h-main flex-1">
          <div className="w-full gap-3 sm:flex sm:items-start">
            {children}
            <ResponsiveRender
              mobile={SearchOptionsModal}
              aboveMobile={SearchOptionsSidebar}
            />
          </div>
        </main>
        <Divider />
        <AppFooter />
      </div>
    </>
  );
}
