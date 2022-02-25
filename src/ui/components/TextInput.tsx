import React, { useEffect } from 'react';

import { clsxm } from '@/ui/utils';

type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  className?: string;
  autoFocus?: boolean;
};

export function TextInput({
  placeholder,
  onChange: handleChange,
  value,
  className,
  autoFocus = false,
  ...props
}: TextInputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    autoFocus && inputRef.current?.focus();
  }, [autoFocus]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handleChange(event.currentTarget.value);
  };

  return (
    <input
      autoFocus={autoFocus}
      placeholder={placeholder}
      className={clsxm(
        'block max-w-full flex-1',
        'border border-base-300 transition-all dark:border-base-600',
        'focus:border-2 focus:border-indigo-500 focus:dark:border-indigo-500',
        'bg-surface !rounded-md !text-base !leading-none !text-base-600 placeholder:!text-base placeholder:!leading-none dark:!bg-base-1100 dark:!bg-opacity-70 dark:!text-base-100 dark:placeholder:!text-gray-400',
        className,
      )}
      ref={inputRef}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
}
