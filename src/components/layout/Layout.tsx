import * as React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Put Header or Footer Here
  return <>{children}</>;
}
