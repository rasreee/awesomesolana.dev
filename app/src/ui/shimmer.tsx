import { classed } from '@awesomesolana/tw';

const Shimmer = classed(
  'div',
  'h-10 w-full rounded-md bg-surface-0',
  'animate-pulse',
);

export default Shimmer;
