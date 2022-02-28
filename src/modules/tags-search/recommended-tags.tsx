import uuid from '@/lib/utils/uuid';
import BasicOutlineBadge from '@/ui/basic-outline-badge';

export interface Topic {
  id: string;
  name: string;
  description: string;
  sourcesCount: number;
}

type MakeTopicParams = { name: string; description?: string };

const makeTopic = (initialData: MakeTopicParams): Topic => {
  const defaultData = { description: '' };

  return { ...defaultData, ...initialData, id: uuid.v4(), sourcesCount: 0 };
};

const makeTopics = (...args: MakeTopicParams[]): Topic[] => {
  return args.map(makeTopic);
};

const trendingTopics: Topic[] = makeTopics(
  { name: 'nft' },
  { name: 'did' },
  { name: 'payment' },
  { name: 'names' },
  { name: 'defi' },
  { name: 'dao' },
  { name: 'typescript' },
  { name: 'rust' },
  { name: 'nextjs' },
  { name: 'amm' },
  { name: 'anchor' },
);

const RecommendedTags = () => {
  return (
    <div className="flex flex-col gap-7 py-2 px-5">
      <span className="text-xl font-medium leading-none">
        Recommended topics
      </span>
      <ul className="flex flex-wrap items-center gap-2">
        {trendingTopics.map((topic) => (
          <li key={topic.id} className="">
            <BasicOutlineBadge className="py-3">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 py-2">
                  <span className="text text-base font-medium leading-none text-opacity-80">
                    {topic.name}
                  </span>
                  {' · '}
                  <span className="text-hint text-xs leading-none">
                    {topic.sourcesCount}
                  </span>
                </div>
                {topic.description && (
                  <div className="text-body text-sm">{topic.description}</div>
                )}
              </div>
            </BasicOutlineBadge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedTags;
