import { classed, clsxm } from "@awesomesolana/tw";
import React, { useEffect } from "react";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  autoFocused?: boolean;
};

export function TextInput({
  placeholder,
  value,
  className,
  autoFocused = false,
  autoComplete = "off",
  type = "text",
  ...props
}: TextInputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    autoFocused && inputRef.current?.focus();
  }, [autoFocused]);

  return (
    <input
      className={clsxm(
        "block max-w-full flex-1",
        "py-1 px-2",
        "text-base-600 dark:bg-base-1100 dark:text-base-10 rounded-md bg-transparent text-base leading-none placeholder:text-base placeholder:leading-none dark:bg-opacity-70 dark:placeholder:text-gray-400",
        className
      )}
      autoFocus={autoFocused}
      placeholder={placeholder}
      ref={inputRef}
      value={value}
      autoComplete={autoComplete}
      type={type}
      {...props}
    />
  );
}
