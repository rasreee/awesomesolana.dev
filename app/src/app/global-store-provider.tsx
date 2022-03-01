import React from 'react';

import { StoreProvider } from '@/lib/mobx/store-context';
import { GlobalStore } from '@/stores/global-store';

export default function GlobalStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rootStore] = React.useState(new GlobalStore());

  return <StoreProvider store={rootStore}>{children}</StoreProvider>;
}
