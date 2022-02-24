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
};

export function TextInput({
  placeholder,
  onChange: handleChange,
  value,
  className,
  ...props
}: TextInputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handleChange(event.currentTarget.value);
  };

  return (
    <input
      placeholder={placeholder}
      className={clsxm(
        'block max-w-full flex-1',
        'border-transparent',
        'text-base-600 dark:text-base-100 dark:placeholder:text-gray-400',
        'input',
        className,
      )}
      ref={inputRef}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
}
