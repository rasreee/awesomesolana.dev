import '@/styles/globals.css';
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useState } from 'react';
import { SWRConfig } from 'swr';

import { getSeo } from '@/app/seo';
import type { LayoutProps } from '@/layouts/core/types';
import { getLayout } from '@/layouts/get-layout';
import { StoreProvider } from '@/lib/mobx/store-context';
import fetcher from '@/lib/utils/fetcher';
import { RootStore } from '@/stores/root-store';

function MyApp({ Component, pageProps }: AppProps) {
  const seo = getSeo();
  const Layout = getLayout<LayoutProps>(Component);
  const [rootStore] = useState(new RootStore());

  return (
    <>
      <DefaultSeo {...seo} />
      <NextThemeProvider attribute="class">
        <SWRConfig value={{ fetcher }}>
          <StoreProvider store={rootStore}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StoreProvider>
        </SWRConfig>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
