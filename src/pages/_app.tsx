import '@/styles/globals.css';
import '@/styles/colors.css';

import { fetcher } from '@utils/fetcher';
import { getSeo } from '@utils/seo';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import { getLayout, LayoutProps } from '@/ui/layouts';

function MyApp({ Component, pageProps }: AppProps) {
  const seo = getSeo();
  const Layout = getLayout<LayoutProps>(Component);

  return (
    <>
      <DefaultSeo {...seo} />
      <NextThemeProvider attribute="class">
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
