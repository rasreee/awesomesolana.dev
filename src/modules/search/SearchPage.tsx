import { useRouter } from 'next/router';

import {
  FilterCategoriesBar,
  FilterCategoriesControls,
  FilterCategoryMenu,
  GithubReposFeed,
  GithubReposProps,
  SearchForm,
  useSearchForm,
} from './components';
import { useSearchState, useSubmitQuery } from './hooks';

export function SearchPage() {
  return (
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex flex-col gap-2">
        <SearchBox />
        <Filters />
      </div>
      <Results />
    </div>
  );
}

function SearchBox() {
  const router = useRouter();
  const submitQuery = useSubmitQuery();
  const { query, error, loading, setLoading, setError, setQuery } =
    useSearchForm((query) => submitQuery(query));

  const handleSubmit = async (q: string) => {
    setLoading(false);
    setError(null);
    try {
      await submitQuery(q);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setError(null);
    setQuery('');
    setLoading(false);
    router.push('/search');
  };

  return (
    <SearchForm
      autoFocused
      {...{
        query,
        error,
        loading,
        onChange: setQuery,
        onSubmit: handleSubmit,
        onReset: handleReset,
      }}
    />
  );
}

function Filters() {
  return (
    <FilterCategoriesBar>
      <FilterCategoriesControls />
      <FilterCategoryMenu />
    </FilterCategoriesBar>
  );
}

function Results() {
  const { filters, query } = useSearchState();
  const shouldSearch = Boolean(filters.length || query.trim());
  const args: GithubReposProps = shouldSearch
    ? { route: '/search', params: { filters, keywords: [query] } }
    : { route: '/browse' };

  return <GithubReposFeed {...args} />;
}
