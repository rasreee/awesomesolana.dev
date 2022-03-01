import uuid from '@/lib/uuid';

export interface Source {
  id: string;
  title: string;
  description: string;
  tags: string[];
  updatedAt: DateString;
  views: number;
  upvotes: number;
  downvotes: number;
  url: string;
}

const makeSource = (
  initialData: Pick<
    Source,
    'title' | 'description' | 'tags' | 'url' | 'updatedAt'
  >,
): Source => {
  const defaultData: Pick<
    Source,
    'id' | 'tags' | 'views' | 'upvotes' | 'downvotes'
  > = {
    id: uuid.v4(),
    tags: [],
    views: 0,
    upvotes: 0,
    downvotes: 0,
  };

  return {
    ...defaultData,
    ...initialData,
  };
};

const popularRepos: Source[] = [
  makeSource({
    title: 'foo-bar',
    description: 'This is a foo bar!',
    tags: ['foo', 'bar', 'xyz'],
    url: 'https://foo-bar-source.com',
    updatedAt: new Date().toISOString(),
  }),
  makeSource({
    title: 'dank-dankz',
    description: 'This is a foo bar!',
    tags: ['idk', 'dank', 'abc'],
    url: 'https://dank-dankz.com',
    updatedAt: new Date().toISOString(),
  }),
  makeSource({
    title: 'idk-what-im-doing',
    description: 'IDK what im doing! pls help',
    tags: ['halp', 'pls'],
    url: 'https://halp-pls.com',
    updatedAt: new Date().toISOString(),
  }),
];

const PopularRepos = () => {
  return (
    <div>
      <h3>Popular Repos</h3>
      <ul>
        {popularRepos.map((source) => (
          <li key={source.id}>
            <span>{source.title}</span>
            <span>{source.description}</span>
            <div className="flex items-center gap-3">
              <span>{source.updatedAt}</span>
              <div className="flex items-center gap-1.5">
                {source.tags.map((topic) => (
                  <div key={topic}>{topic}</div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PopularRepos;
