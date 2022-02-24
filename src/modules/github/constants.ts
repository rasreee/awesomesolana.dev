export const GITHUB_SORT_MAPPING = Object.freeze({
  default: 'sort:updated-desc',
  stargazers: 'sort:stars-desc',
  name: 'sort:name-asc',
});

export const GITHUB_SORT_OPTIONS = Object.freeze([
  { value: '', label: 'Last updated', summary: 'last updated' },
  { value: 'name', label: 'Name', summary: 'name' },
  { value: 'stargazers', label: 'Stars', summary: 'stars' },
]);
