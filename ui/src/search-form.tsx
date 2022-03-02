import { clsxm } from "@awesomesolana/tw";
import { FormEvent, useEffect, useRef, useState } from "react";

import { ErrorMessage } from "./error-message";
import { formData } from "./lib/form";
import { TextInput, TextInputProps } from "./text-input";

export type SearchFormData = {
  query: string;
};

export type SearchFormProps = {
  error: string | null | undefined;
  textInputProps: TextInputProps;
  onSubmit: (query: SearchFormData) => any;
};

const DEFAULT_SEARCH_PLACEHOLDER =
  "Search for any project, dependency, or topic";

export function SearchForm({
  error,
  textInputProps,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm(e.currentTarget);
  };

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className={clsxm(
          "flex max-w-full items-center gap-0",
          "rounded-full",
          "pr-4",
          "bg-app",
          "h-14",
          "transition-all",
          focused
            ? "border-2 border-indigo-500 dark:border-indigo-500"
            : "border-base-300 dark:border-base-500 border"
        )}
      >
        <TextInput
          {...textInputProps}
          {...{ onFocus, onBlur }}
          name="query"
          className={clsxm("py-2.5", "flex-1 rounded-full px-5")}
          placeholder={DEFAULT_SEARCH_PLACEHOLDER}
        />
      </form>
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}
