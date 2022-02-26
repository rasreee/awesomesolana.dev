import { NextSeo, NextSeoProps } from 'next-seo';
import React from 'react';

import { siteConfig } from '@/configs/site-config';

export interface SeoProps extends Pick<NextSeoProps, 'title' | 'description'> {}

export const Seo = ({ title, description }: SeoProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description }}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
);
