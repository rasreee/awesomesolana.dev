import React, { useEffect } from 'react';

import clsxm from '@/lib/clsxm';

export function TextInput({
  placeholder,
  onChange: handleChange,
  value,
  className,
  ...props
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  className?: string;
}) {
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
        'block max-w-full flex-1 border-none',
        'bg-transparent',
        'text-base-600 dark:text-base-100 dark:placeholder:text-gray-400',
        'text-base leading-none placeholder:leading-none md:text-lg md:leading-none',
        className,
      )}
      ref={inputRef}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
}
