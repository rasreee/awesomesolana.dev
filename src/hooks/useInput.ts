import React, { useEffect, useState } from 'react';

export function useAutoFocusedInput(): {
  ref: React.MutableRefObject<HTMLInputElement | null>;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
} {
  const [value, setValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return { value, onChange: handleChange, ref: inputRef };
}
