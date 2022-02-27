import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { siteConfig } from '@/app/site-config';
import PageLayout from '@/layouts/page-layout';
import Filters from '@/modules/filters/filters';
import { useRootStore } from '@/stores/root-store';

import { ReposSearchBox } from './repos-search-box';

const ReposResults = dynamic(() => import('./repo-results/repos-results'));

const ReposPage = observer(function ReposPage() {
  const { reposSearch } = useRootStore();

  const title = reposSearch.query
    ? `${reposSearch.query} · ${siteConfig.seo.title}`
    : `Repos · ${siteConfig.seo.title}`;

  return (
    <PageLayout title={title}>
      <div className="flex flex-col gap-2">
        <ReposSearchBox />
        <Filters />
      </div>
      <ReposResults />
    </PageLayout>
  );
});

export default ReposPage;
