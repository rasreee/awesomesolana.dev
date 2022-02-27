import { siteConfig } from '@configs/site-config';

export type SeoOptions = {
  omitOpenGraphImage?: boolean;
};

export default function getSeo(options: SeoOptions = {}) {
  const { omitOpenGraphImage } = options;
  const { seo } = siteConfig;
  const { images, ...openGraph } = seo.openGraph;

  return {
    ...seo,
    openGraph: {
      ...openGraph,
      images: omitOpenGraphImage ? undefined : images,
    },
  };
}
