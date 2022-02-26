import { siteConfig } from '@configs/site-config';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { capitalize } from './capitalize';

export type SeoOptions = {
  omitOpenGraphImage?: boolean;
};

function getRouteTitle(pathname: string): string {
  const splits = pathname.split('/');
  const basePath = splits.length > 1 ? splits[1] : '';
  const title = capitalize(basePath.replace('/', ''));

  return title;
}

export function getSeo(pathname = '', options: SeoOptions = {}) {
  const { omitOpenGraphImage } = options;
  const { seo } = siteConfig;
  const { images, ...openGraph } = seo.openGraph;

  return {
    ...seo,
    title: getRouteTitle(pathname),
    openGraph: {
      ...openGraph,
      images: omitOpenGraphImage ? undefined : images,
    },
  };
}

export function useSeoProps(options: SeoOptions = {}) {
  const pathname = useRouter().pathname;

  return useMemo(() => getSeo(pathname, options), [pathname, options]);
}
