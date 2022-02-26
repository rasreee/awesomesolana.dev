import { DependencyList, useEffect } from 'react';

const waitFor = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));

export function useDebouncedEffect(
  callback: CallableFunction,
  deps: DependencyList,
  delay: number,
) {
  useEffect(() => {
    waitFor(delay).then(() => callback());
  }, [delay, ...deps]);
}
