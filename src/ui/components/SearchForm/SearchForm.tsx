import clsxm from '@utils/clsxm';
import { FormEventHandler, useState } from 'react';

import { ErrorMessage, StatefulIcon, TextInput } from '@/ui/components';
import { SearchIcon, XIcon } from '@/ui/icons';

const DEFAULT_PLACEHOLDER = 'Search for any project, dependency, or topic';

export type SearchFormProps = {
  error?: string | null;
  loading: boolean;
  query: string;
  onChange: (query: string) => void;
  autoFocused?: boolean;
  onReset: () => void;
  onSubmit: (query: string) => any;
  onClick?: () => void;
};

export function SearchForm({
  error,
  loading,
  query,
  onChange,
  onReset,
  autoFocused = false,
  onSubmit,
  onClick,
}: SearchFormProps) {
  const [focused, setFocused] = useState(autoFocused);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(query);
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
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulIcon
        className={clsxm('h-4 w-4', {
          'text-color-primary': focused,
        })}
        label="search"
        loading={loading}
        icon={SearchIcon}
      />
      <TextInput
        name="search"
        className="input-focus-unset px-2"
        placeholder={DEFAULT_PLACEHOLDER}
        autoFocused={autoFocused}
        value={query}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
      />
      {Boolean(query) && (
        <button className="p-1" onClick={onReset}>
          <XIcon className="box-border h-4 w-4" />
        </button>
      )}
    </form>
  );
}
