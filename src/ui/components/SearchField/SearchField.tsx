import { useRef, useState } from 'react';

import { useAppState } from '@/contexts/AppContext';
import clsxm from '@/lib/clsxm';
import { ErrorMessage, StatefulIcon, TextInput } from '@/ui/components';
import { AdjustmentsIcon, SearchIcon } from '@/ui/icons';

const DEFAULT_PLACEHOLDER = 'Search for any project, dependency, or topic';

export type SearchFieldProps = {
  error?: string | null;
  isRequesting: boolean;
  query: string;
  onChange: (query: string) => void;
  autoFocused?: boolean;
};

export function SearchField({
  error,
  isRequesting,
  query,
  onChange,
  autoFocused = false,
}: SearchFieldProps) {
  const { filtersMenu } = useAppState();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [focused, setFocused] = useState(autoFocused);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div
      className={clsxm(
        'flex !max-h-[3rem] min-w-full items-center gap-1 px-2 py-1',
        'input bg-surface-1',
        focused || filtersMenu.isOpen ? 'input-border-focused' : 'input-border',
        'rounded-full',
      )}
    >
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulIcon
        className={clsxm({
          'text-color-primary': focused,
        })}
        label="search"
        loading={isRequesting}
        icon={SearchIcon}
      />
      <TextInput
        name="search"
        className="input-focus-unset"
        placeholder={DEFAULT_PLACEHOLDER}
        autoFocused={autoFocused}
        value={query}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        ref={buttonRef}
        onClick={filtersMenu.toggle}
        className={clsxm(
          'text',
          filtersMenu.isOpen || (focused && 'bg-surface text-color-primary'),
          'h-full rounded p-1',
        )}
      >
        <AdjustmentsIcon
          className={clsxm(
            'text-hint',
            filtersMenu.isOpen && 'text-color-primary',
          )}
        />
      </button>
    </div>
  );
}
