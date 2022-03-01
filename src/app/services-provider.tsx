import React from 'react';

import { Services } from '@/services/services';
import { ServicesContext } from '@/services/services-context';

export default function ServicesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services] = React.useState(new Services());

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}
