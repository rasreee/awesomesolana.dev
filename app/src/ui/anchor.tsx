import { classed, clsxm } from '@awesomesolana/tw';
import React from 'react';

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

const defaultAnchorClassName = clsxm(
  'cursor-pointer transition-all',
  'font-semibold text leading-none',
  'm-0 p-0',
);

const getClassName = (initialClassName: string | undefined) =>
  clsxm(defaultAnchorClassName, initialClassName);

const getProps = ({
  external = false,
  className,
  ...restProps
}: AnchorProps): React.AnchorHTMLAttributes<HTMLAnchorElement> => {
  if (external)
    return {
      ...restProps,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: getClassName(className),
    };
  return { ...restProps, className: getClassName(className) };
};

const SAnchor = classed('a', defaultAnchorClassName);

export const Anchor: React.FunctionComponent<AnchorProps> = ({
  external = false,
  ...restProps
}) => {
  const props = getProps({ external, ...restProps });

  return <SAnchor {...props} />;
};
