import { Layout } from '@/ui/layouts';

import { filterProjects, Project } from '../projects';
import { groupTagsByType } from '../tags';
import { SearchBar } from './SearchBar';
import { useSearch } from './SearchContext';
import { TagsMenu } from './TagsMenu';

function FilterBar() {
  const { search } = useSearch();

  return (
    <div className="flex items-center gap-2 px-5 py-3">
      {search.tags &&
        groupTagsByType(search.tags).map(
          ({ type, tags }) =>
            tags.length > 0 && (
              <div key={type}>
                <TagsMenu type={type} tags={tags} />
              </div>
            ),
        )}
    </div>
  );
}

export function SearchPage() {
  const { search } = useSearch();

  return (
    <Layout>
      <SearchBar />
      <FilterBar />
      <div>
        {filterProjects(search.tags ?? []).map((project) => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </div>
    </Layout>
  );
}

function ProjectItem({
  title,
  description,
  dependencies,
  topics,
  ...props
}: Project) {
  return (
    <div {...props}>
      <div className="text-lg font-medium">{title}</div>
      <div className="text-base">{description}</div>
      <div className="flex flex-wrap items-center gap-1">
        {dependencies.map((dependency) => (
          <div key={dependency}>{dependency}</div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {topics.map((topic) => (
          <div key={topic}>{topic}</div>
        ))}
      </div>
    </div>
  );
}
