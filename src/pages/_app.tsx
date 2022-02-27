import '@/styles/globals.css';
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useState } from 'react';
import { SWRConfig } from 'swr';

import { getSeo } from '@/app/seo';
import { siteConfig } from '@/app/site-config';
import type { LayoutProps } from '@/layouts/core/types';
import { getLayout } from '@/layouts/get-layout';
import { StoreProvider } from '@/lib/mobx/store-context';
import { RootStore } from '@/stores/root-store';

async function fetcher<JSON = any>(
  input: RequestInfo,
  init: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

function MyApp({ Component, pageProps }: AppProps) {
  const seo = getSeo();
  const Layout = getLayout<LayoutProps>(Component);
  const [rootStore] = useState(new RootStore());

  return (
    <>
      <Head>
        <title>{siteConfig.seo.title}</title>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
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
