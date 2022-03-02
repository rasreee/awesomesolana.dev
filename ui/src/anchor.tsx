import { classed, clsxm } from "@awesomesolana/tw";
import React, { forwardRef, Ref } from "react";

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

const defaultClassName = clsxm(
  "cursor-pointer transition-all",
  "font-semibold text leading-none",
  "m-0 p-0"
);

const getClassName = (initialClassName: string | undefined) =>
  clsxm(defaultClassName, initialClassName);

const getProps = ({
  external = false,
  className,
  ...restProps
}: AnchorProps): React.AnchorHTMLAttributes<HTMLAnchorElement> => {
  if (external)
    return {
      ...restProps,
      target: "_blank",
      rel: "noopener noreferrer",
      className: getClassName(className),
    };
  return { ...restProps, className: getClassName(className) };
};

const SAnchor = classed("a", defaultClassName);

export const Anchor = forwardRef(
  (
    { external = false, ...restProps }: AnchorProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    const props = getProps({ external, ...restProps });

    return <SAnchor ref={ref} {...props} />;
  }
);
