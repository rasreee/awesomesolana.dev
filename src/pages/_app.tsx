import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consisten layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
