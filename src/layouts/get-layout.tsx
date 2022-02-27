const Noop: React.FC = ({ children }) => <>{children}</>;

export function getLayout<LP extends {}>(
  Component: React.ComponentType<any>,
): React.ComponentType<LP> {
  return (Component as any).Layout || Noop;
}
