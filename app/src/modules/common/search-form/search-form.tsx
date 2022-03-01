import { Tag } from '@awesomesolana/common';
import { clsxm } from '@awesomesolana/tw';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { formData } from '@/lib/form-data';
import { ErrorMessage } from '@/ui/error-message';
import type { TextInputProps } from '@/ui/text-input';

import { SearchFormData } from './types';

const XIcon = dynamic(() => import('@/ui/icons/x-icon'));
const TextInput = dynamic(() => import('@/ui/text-input'));

export type SearchFormProps = {
  error: string | null | undefined;
  textInputProps: TextInputProps;
  onReset: () => void;
  onSubmit: (query: SearchFormData) => any;
  filters?: Tag[];
};

const DEFAULT_SEARCH_PLACEHOLDER =
  'Search for any project, dependency, or topic';

export function SearchForm({
  error,
  textInputProps,
  onReset,
  onSubmit,
  filters = [],
}: SearchFormProps) {
  const [focused, setFocused] = useState(textInputProps?.autoFocused);

  const formRef = useRef<HTMLFormElement | null>(null);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const submitForm = (form: HTMLFormElement) => {
    const { query } = formData<Pick<SearchFormData, 'query'>>(form);
    const data = {
      query,
      filters,
    };

    onSubmit(data);
  };

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    submitForm(form);
  }, [formRef.current]);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        submitForm(event.currentTarget);
      }}
      className={clsxm(
        'flex !max-h-[3rem] max-w-full flex-1 items-center gap-0 px-2 py-1',
        'input bg-surface-1',
        focused ? 'input-border-focused' : 'input-border',
        'rounded-full',
      )}
    >
      <ErrorMessage>{error}</ErrorMessage>
      <TextInput
        {...textInputProps}
        {...{ onFocus, onBlur }}
        name="query"
        className="input-focus-unset px-2"
        placeholder={DEFAULT_SEARCH_PLACEHOLDER}
      />
      {textInputProps.value && (
        <button className="p-1" onClick={onReset}>
          <XIcon className="box-border h-4 w-4" />
        </button>
      )}
    </form>
  );
}
