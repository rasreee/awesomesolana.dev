import React from 'react';

import { Services } from './services';

export const ServicesContext = React.createContext<Services>({} as Services);

export const useServices = (): Services => React.useContext(ServicesContext);
