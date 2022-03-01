import { createClient } from '@supabase/supabase-js';
import React from 'react';

import environment from '@/environment';
import { Services } from '@/services/services';
import { ServicesContext } from '@/services/services-context';

export default function ServicesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services] = React.useState(
    new Services(
      createClient(environment.supabase.url, environment.supabase.key),
    ),
  );

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}
