import * as React from 'react';
import { ComponentType } from 'react';

import { SearchOptionsModal, SearchOptionsSidebar } from '@/modules/search';
import { Divider, Seo, SeoProps } from '@/ui/components';
import { useIsMobile } from '@/ui/hooks';

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
              small={SearchOptionsModal}
              aboveSmall={SearchOptionsSidebar}
            />
          </div>
        </main>
        <Divider />
        <AppFooter />
      </div>
    </>
  );
}

export function ResponsiveRender({
  small: Small,
  aboveSmall: AboveSmall,
}: {
  small: ComponentType;
  aboveSmall: ComponentType;
}) {
  const isMobile = useIsMobile();

  if (isMobile) return <Small />;

  return <AboveSmall />;
}
