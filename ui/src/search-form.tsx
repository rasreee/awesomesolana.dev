import { clsxm } from "@awesomesolana/tw";
import { useEffect, useRef, useState } from "react";

import { ErrorMessage } from "./error-message";
import { XIcon } from "./icons";
import { formData } from "./lib/form";
import { TextInput, TextInputProps } from "./text-input";

export type SearchFormData = {
  query: string;
};

export type SearchFormProps = {
  error: string | null | undefined;
  textInputProps: TextInputProps;
  onReset: () => void;
  onSubmit: (query: SearchFormData) => any;
};

const DEFAULT_SEARCH_PLACEHOLDER =
  "Search for any project, dependency, or topic";

export function SearchForm({
  error,
  textInputProps,
  onReset,
  onSubmit,
}: SearchFormProps) {
  const [focused, setFocused] = useState(textInputProps?.autoFocused);

  const formRef = useRef<HTMLFormElement | null>(null);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const submitForm = (form: HTMLFormElement) => {
    const { query } = formData<SearchFormData>(form);
    const data = {
      query,
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
        "flex !max-h-[3rem] max-w-full flex-1 items-center gap-0 px-2 py-1",
        "input bg-surface-1",
        focused ? "input-border-focused" : "input-border",
        "rounded-full"
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
