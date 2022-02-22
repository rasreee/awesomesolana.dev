import React, { useEffect, useState } from 'react';

export function useAutoFocusedInput({
  value: initialValue = '',
}: {
  value?: string | undefined;
}): {
  ref: React.MutableRefObject<HTMLInputElement | null>;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
} {
  const [value, setValue] = useState(initialValue);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return { value, onChange: handleChange, ref: inputRef };
}
