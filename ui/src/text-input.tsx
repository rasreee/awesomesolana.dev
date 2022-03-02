import { classed, clsxm } from "@awesomesolana/tw";
import React, { useEffect } from "react";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  autoFocused?: boolean;
};

const STextInput = classed(
  "input",
  clsxm(
    "block max-w-full flex-1",
    "border-base-300 dark:border-base-600 border transition-all",
    "focus:border-2 focus:border-indigo-500 focus:dark:border-indigo-500",
    "bg-surface !text-base-600 dark:!bg-base-1100 dark:!text-base-100 !rounded-md !text-base !leading-none placeholder:!text-base placeholder:!leading-none dark:!bg-opacity-70 dark:placeholder:!text-gray-400"
  )
);

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
    <STextInput
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
