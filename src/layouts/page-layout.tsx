import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('./core/core-layout'));

const PageLayout = ({
  children,
  title = '',
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <Layout title={title}>
      <div className="flex-1 px-3 sm:px-6">{children}</div>
    </Layout>
  );
};

export default PageLayout;
