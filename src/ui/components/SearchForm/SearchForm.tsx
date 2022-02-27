import clsxm from '@utils/clsxm';
import { FormEventHandler, useState } from 'react';

import { RequestState } from '@/stores/request-store';
import { ErrorMessage, TextInputProps } from '@/ui/components';
import { XIcon } from '@/ui/icons';

import { SearchField } from './SearchField';

export type SearchFormProps = {
  request: RequestState;
  textInputProps: TextInputProps;
  onReset: () => void;
  onSubmit: (query: string) => any;
};

export function SearchForm({
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
