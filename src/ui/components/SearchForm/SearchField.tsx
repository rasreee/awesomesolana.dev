import React from 'react';

import { TextInput, TextInputProps } from '../TextInput';

export type SearchFieldProps = TextInputProps;

export function SearchField({
  placeholder = 'Search for any project, dependency, or topic',
  ...props
}: SearchFieldProps) {
  return (
    <>
      <TextInput
        {...props}
        name="search"
        className="input-focus-unset px-2"
        placeholder={placeholder}
      />
    </>
  );
}
