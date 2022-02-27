import dynamic from 'next/dynamic';

import { LayoutProps } from './core/types';

const Layout = dynamic(() => import('./core/core-layout'));

const PageLayout = ({ children, seo }: LayoutProps) => {
  return (
    <Layout seo={seo}>
      <div className="flex-1 px-3 sm:px-6">{children}</div>
    </Layout>
  );
};

export default PageLayout;
