import { NextSeo, NextSeoProps } from 'next-seo';
import React, { useMemo } from 'react';

import { getSEO } from '@/app/seo';

export type SeoProps = Partial<NextSeoProps>;

const Seo = (props: SeoProps) => {
  const seo = useMemo(() => {
    return getSEO(props);
  }, [props.title, props.description, props.titleTemplate, props]);

  return <NextSeo {...seo} />;
};

export default Seo;
