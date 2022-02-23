import React, { useEffect } from 'react';

import clsxm from '@/lib/clsxm';

export function SearchInput({
  placeholder,
  ...props
}: {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      type="search"
      name="search"
      placeholder={placeholder}
      className={clsxm(
        'block max-w-full flex-1 border-none leading-none',
        'bg-transparent',
        'text-base-600 dark:text-base-100 dark:placeholder:text-gray-400',
        'text-base md:text-lg',
      )}
      ref={inputRef}
      {...props}
    />
  );
}
