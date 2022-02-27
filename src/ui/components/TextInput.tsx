import clsxm from '@utils/clsxm';
import React, { useEffect } from 'react';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  value: string;
  type?: string;
  name?: string;
  className?: string;
  autoFocused?: boolean;
};

export function TextInput({
  placeholder,
  value,
  className,
  autoFocused = false,
  autoComplete = 'off',
  type = 'text',
  ...props
}: TextInputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    autoFocused && inputRef.current?.focus();
  }, [autoFocused]);

  return (
    <input
      autoFocus={autoFocused}
      placeholder={placeholder}
      className={clsxm(
        'block max-w-full flex-1',
        'border border-base-300 transition-all dark:border-base-600',
        'focus:border-2 focus:border-indigo-500 focus:dark:border-indigo-500',
        'bg-surface !rounded-md !text-base !leading-none !text-base-600 placeholder:!text-base placeholder:!leading-none dark:!bg-base-1100 dark:!bg-opacity-70 dark:!text-base-100 dark:placeholder:!text-gray-400',
        className,
      )}
      ref={inputRef}
      value={value}
      autoComplete={autoComplete}
      type={type}
      {...props}
    />
  );
}
