import times from 'lodash.times';

import classed from '@/lib/classed';

import Shimmer from './shimmer';

const ShimmerList = classed('ul', 'flex flex-col gap-5');

const FeedSkeleton = ({ n = 3 }: { n?: number }) => {
  return (
    <ShimmerList>
      {times(n, (index) => (
        <li key={index}>
          <Shimmer />
        </li>
      ))}
    </ShimmerList>
  );
};

export default FeedSkeleton;
