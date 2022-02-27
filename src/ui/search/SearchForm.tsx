import clsxm from '@utils/clsxm';
import dynamic from 'next/dynamic';
import { FormEventHandler, useState } from 'react';

import { RequestState } from '@/mobx/request-store';
import { ErrorMessage } from '@/ui/components/ErrorMessage';
import type { TextInputProps } from '@/ui/components/TextInput';

const XIcon = dynamic(() => import('@/ui/icons/XIcon'));
const TextInput = dynamic(() => import('@/ui/components/TextInput'));

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
