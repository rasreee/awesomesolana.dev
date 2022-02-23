import { Project } from '../projects';

export function ProjectItem({
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
