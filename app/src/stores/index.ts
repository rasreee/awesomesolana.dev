import { useStore } from '@/lib/mobx/store-context';

import { GlobalStore } from './global-store';

export const useGlobalStore = (): GlobalStore => useStore<GlobalStore>();
