import { GitHubRepo } from '@/modules/github/types';

export function RepoItem({ name, description }: GitHubRepo) {
  // const getIsFilterActive = useGetIsFilterActive();
  // const toggleFilter = useToggleFilter();

  // const handleToggleFilter = (tag: Tag) => () => toggleFilter(tag);

  return (
    <div className="bg-surface rounded bg-opacity-70">
      <div className="flex flex-col gap-2 px-3 py-3">
        <div className="text-xl font-semibold">{name}</div>
        <div className="text-base">{description}</div>
        <ul className="flex flex-wrap items-center gap-1.5">
          {/* {topics.map((topic) => (
            <li key={`${topic}`}>
              <FilterTag
                isActive={getIsFilterActive(topic)}
                tag={topic}
                onClick={handleToggleFilter(topic)}
              />
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
