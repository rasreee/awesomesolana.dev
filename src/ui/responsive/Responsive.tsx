import { Component, ComponentType, FunctionComponent } from 'react';

import { useWindowDimensions } from '@/lib/hooks/use-window-dimensions';

import { useBreakpoints } from './use-breakpoints';

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
  o: ComponentOrElement<P>,
  props: P = {} as P,
): JSX.Element {
  if (isReactComponent<P>(o)) {
    const Comp = o;
    return <Comp {...props} />;
  }

  return o;
}

type ComponentOrElement<P extends {} = {}> = ComponentType<P> | JSX.Element;

function Responsive<P extends {} = {}>({
  sm,
  aboveSm,
  aboveMd,
  props = {} as P,
}: {
  sm: ComponentOrElement<P>;
  aboveSm: ComponentOrElement<P>;
  aboveMd?: ComponentOrElement<P>;
  props?: P;
}): JSX.Element | null {
  const breakpoints = useBreakpoints();
  const { width } = useWindowDimensions();

  if (!breakpoints) return null;

  if (breakpoints.isSmall) {
    return asJSXElement(sm, props);
  }

  if (breakpoints.isMedium) {
    return asJSXElement(aboveSm, props);
  }

  if (breakpoints.isLarge) {
    if (!aboveMd) return asJSXElement(aboveSm, props);

    return asJSXElement(aboveMd, props);
  }

  throw new Error(
    breakpoints
      ? `Could not render Responsive for invalid breakpoint: ${width}.`
      : 'Could not render Responsive due to breakpoints not being hydrated',
  );
}

export default Responsive;
