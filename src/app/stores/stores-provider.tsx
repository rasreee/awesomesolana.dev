import React from 'react';

import { StoreProvider } from '@/lib/mobx/store-context';

import { RootStore } from './root-store';

export default function StoresProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rootStore] = React.useState(new RootStore());

  return <StoreProvider store={rootStore}>{children}</StoreProvider>;
}
