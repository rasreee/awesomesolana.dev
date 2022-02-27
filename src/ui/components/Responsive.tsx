import clsxm from '@utils/clsxm';
import { Component, ComponentType, FunctionComponent } from 'react';

import { useIsMobile } from '@/ui/hooks';

export function HideOnMobile({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsxm('hidden md:block', className)}>{children}</div>;
}

export function OnlyMobile({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsxm('md:hidden', className)}>{children}</div>;
}

function isFunctionComponent<P extends {}>(o: any): o is FunctionComponent<P> {
  return (
    typeof o === 'function' && String(o).includes('return React.createElement')
  );
}

function isClassComponent<P extends {}>(o: any): o is Component<P> {
  return typeof o === 'function' && !!o.prototype.isReactComponent;
}

function isReactComponent<P extends {}>(o: any): o is ComponentType<P> {
  return isFunctionComponent(o) || isClassComponent(o);
}

function asJSXElement<P extends {}>(
  o: ComponentType<P> | JSX.Element,
  props: P = {} as P,
): JSX.Element {
  if (isReactComponent<P>(o)) {
    const Comp = o;
    return <Comp {...props} />;
  }

  return o;
}

export function ResponsiveRender<P = {}>({
  mobile,
  aboveMobile,
  props = {} as P,
}: {
  mobile: ComponentType<P> | JSX.Element;
  aboveMobile: ComponentType<P> | JSX.Element;
  props?: P;
}): JSX.Element {
  const isMobile = useIsMobile();

  if (isMobile) {
    return asJSXElement(mobile, props);
  }

  return asJSXElement(aboveMobile, props);
}
