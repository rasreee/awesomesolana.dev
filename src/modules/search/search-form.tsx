import dynamic from 'next/dynamic';
import { FormEventHandler, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { RequestState } from '@/lib/mobx/request-store';
import clsxm from '@/lib/utils/clsxm';
import { ErrorMessage } from '@/ui/error-message';
import type { TextInputProps } from '@/ui/text-input';

const XIcon = dynamic(() => import('@/ui/icons/x-icon'));
const TextInput = dynamic(() => import('@/ui/text-input'));

export type SearchFormProps = {
  request: RequestState;
  textInputProps: TextInputProps;
  onReset: () => void;
  onSubmit: (query: string) => any;
};

function SearchField({
  placeholder = 'Search for any project, dependency, or topic',
  ...props
}: TextInputProps) {
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

function SearchForm({
  textInputProps,
  request,
  onReset,
  onSubmit,
}: SearchFormProps) {
  const [focused, setFocused] = useState(textInputProps.autoFocused);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(textInputProps.value);
  };

  const [valueToSubmit] = useDebounce(textInputProps.value, 200);

  useEffect(() => {
    onSubmit(valueToSubmit);
  }, [valueToSubmit]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={clsxm(
        'flex !max-h-[3rem] max-w-full flex-1 items-center gap-0 px-2 py-1',
        'input bg-surface-1',
        focused ? 'input-border-focused' : 'input-border',
        'rounded-full',
      )}
    >
      <ErrorMessage>{request.error}</ErrorMessage>
      <SearchField {...textInputProps} {...{ onFocus, onBlur }} />
      {Boolean(textInputProps.value) && (
        <button className="p-1" onClick={onReset}>
          <XIcon className="box-border h-4 w-4" />
        </button>
      )}
    </form>
  );
}

export default SearchForm;
