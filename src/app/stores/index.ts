import { useStore } from '@/lib/mobx/store-context';

import { RootStore } from './root-store';

export const useRootStore = (): RootStore => useStore<RootStore>();
