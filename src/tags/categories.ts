export const categoriesConst = [
  'github-repo',
  'github-org',
  'article',
  'whitepaper',
  'awesome-list',
  'video',
  'course',
  'devtool',
] as const;

export type Category = typeof categoriesConst[number];
