import '@/styles/globals.css';
import '@/styles/colors.css';

import { getLayout } from '@layouts/get-layout';
import type { LayoutProps } from '@layouts/types';
import fetcher from '@utils/fetcher';
import getSeo from '@utils/get-seo';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useState } from 'react';
import { SWRConfig } from 'swr';

import { StoreProvider } from '@/mobx/store-context';
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
