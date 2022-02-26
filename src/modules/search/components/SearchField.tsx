import { useState } from 'react';

import clsxm from '@/lib/clsxm';
import { ErrorMessage, StatefulIcon, TextInput } from '@/ui/components';
import { SearchIcon, XIcon } from '@/ui/icons';

const DEFAULT_PLACEHOLDER = 'Search for any project, dependency, or topic';

export type SearchFieldProps = {
  error?: string | null;
  loading: boolean;
  query: string;
  onChange: (query: string) => void;
  autoFocused?: boolean;
  reset: () => void;
};

export function SearchField({
  error,
  loading,
  query,
  onChange,
  reset,
  autoFocused = false,
}: SearchFieldProps) {
  const [focused, setFocused] = useState(autoFocused);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div
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
      />
      {Boolean(query) && (
        <button className="p-1" onClick={reset}>
          <XIcon className="box-border h-4 w-4" />
        </button>
      )}
    </div>
  );
}
