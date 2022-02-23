export function HideOnMobile({ children }: React.PropsWithChildren<{}>) {
  return <div className="hidden md:block">{children}</div>;
}

export function OnlyMobile({ children }: React.PropsWithChildren<{}>) {
  return <div className="md:hidden">{children}</div>;
}
