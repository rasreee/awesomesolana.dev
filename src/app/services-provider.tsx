import React from 'react';

import { initSupabase } from '@/lib/init-supabase';
import { Services } from '@/services/services';
import { ServicesContext } from '@/services/services-context';

export default function ServicesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services] = React.useState(new Services(initSupabase()));

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}
