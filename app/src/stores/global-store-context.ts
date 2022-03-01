import { createContext } from 'react';

import { GlobalStore } from './global-store';

export const GlobalStoreContext = createContext<GlobalStore>(new GlobalStore());
