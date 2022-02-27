import { SeoProps } from '@/ui/seo';

import { siteConfig } from './site-config';

export type SeoOptions = SeoProps & {
  omitOpenGraphImage?: boolean;
};

export function getSEO(options: SeoOptions = {}): SeoProps {
  const { omitOpenGraphImage } = options;
  const seo = { ...siteConfig.seo, ...options };

  const { images } = siteConfig.seo.openGraph;

  return {
    ...seo,
    openGraph: {
      ...siteConfig.seo.openGraph,
      ...{
        title: seo.title,
        dsecription: seo.description,
        titleTemplate: seo.titleTemplate,
      },
      images: omitOpenGraphImage ? undefined : images,
    },
  };
}

export const reposSEO = (q = ''): SeoProps => {
  return {
    title: q,
    titleTemplate: `Search · %s`,
  };
};

export const exploreSEO = (): SeoProps => {
  return {
    title: '',
    description: siteConfig.seo.description,
  };
};
