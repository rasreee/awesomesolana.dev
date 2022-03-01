import { useContext } from 'react';

import { GlobalStore } from './global-store';
import { GlobalStoreContext } from './global-store-context';

export const useGlobalStore = (): GlobalStore => useContext(GlobalStoreContext);
