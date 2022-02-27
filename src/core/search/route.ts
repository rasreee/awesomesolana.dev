import { Tag } from '@core/search';

export const searchRoute = {
  page: ({ tags }: { tags: Tag[] } = { tags: [] }) =>
    `/search${tags.length ? '?' : ''}${tags
      .map((tag) => `${tag.type}=${tag.name.toLowerCase()}`)
      .join('&')}`,
};
