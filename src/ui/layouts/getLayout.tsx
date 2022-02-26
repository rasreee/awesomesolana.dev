import { ComponentType, FC } from 'react';

const Noop: FC = ({ children }) => <>{children}</>;

export function getLayout<LP extends {}>(
  Component: ComponentType<any>,
): ComponentType<LP> {
  return (Component as any).Layout || Noop;
}
